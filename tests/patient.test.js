const db = require('../database/index.js');
const { searchById, search, patch, remove } = require('../src/patient.service.js');
const json_converter = require('../src/json-schema-converter.js');

jest.mock('../database/index.js');
jest.mock('../src/json-schema-converter.js');

// Without calling this tests were miscounting function calls
beforeEach(() => {
    jest.clearAllMocks();
});

describe('Patient API', () => {
  describe('GET /Patient/:id', () => {
    it('should return FHIR JSON for the patient if found', async () => {
      const mockPatient = { identifier: '123', givenname: 'John', familyname: 'Doe' };
      const mockFHIR = { name: [{ given: ['John'], family: 'Doe' }] };
        
      //these two functions set up the searchbyId() call to return the mocked values above
      db.query.mockResolvedValueOnce([mockPatient]);
      json_converter.convertToFHIR.mockReturnValue(mockFHIR);

      const args = { id: '123' };
      const result = await searchById(args);

      expect(result).toEqual(mockFHIR);
      expect(db.query).toHaveBeenCalledWith("SELECT * FROM patients WHERE identifier = $1", ['123']);
      expect(json_converter.convertToFHIR).toHaveBeenCalledWith(mockPatient);
    });

    it('should throw an error if patient is not found', async () => {
      db.query.mockResolvedValueOnce([]);

      const args = { id: '123' };

      await expect(searchById(args)).rejects.toThrow('Unable to locate patient with ID: 123');
    });
  });
});

describe('GET /Patient', () => {
    it('should return FHIR JSON for matching patients', async () => {
      const mockPatients = [
        { identifier: '123', givenname: 'John', familyname: 'Doe' },
        { identifier: '124', givenname: 'John', familyname: 'Smith' },
      ];
      const mockFHIR = [
        { name: [{ given: ['John'], family: 'Doe' }], identifier: [{value:'123'}]},
        { name: [{ given: ['John'], family: 'Smith' }], identifier: [{value:'124'}]},
      ];

      db.query.mockResolvedValueOnce(mockPatients);
      json_converter.convertToFHIR
        .mockReturnValueOnce(mockFHIR[0])
        .mockReturnValueOnce(mockFHIR[1]);

      const req = { query: { givenname: 'John' } };
      const args = {};
      const result = await search(args, { req });

      console.log(json_converter.convertToFHIR.mock.calls);

      expect(result).toEqual(mockFHIR);
      expect(db.query).toHaveBeenCalledWith("SELECT * FROM patients WHERE givenname = $1", ['John']);
      expect(json_converter.convertToFHIR).toHaveBeenCalledTimes(2);
    });

    it('should throw an error if no patients match the criteria', async () => {
      db.query.mockResolvedValueOnce([]);

      const req = { query: { givenname: 'NonExistent' } };
      const args = {};

      await expect(search(args, { req })).rejects.toThrow('Unable to locate patient with conditions:  givenname: NonExistent');
    });
});

describe('PATCH /Patient/:id', () => {
it('should update patient data and return a success response', async () => {
    const mockPatient = { identifier: '123', givenname: 'John', familyname: 'Doe' };
    const updatedPatient = { identifier: '123', givenname: 'Johnny', familyname: 'Doe' };

    db.query
    .mockResolvedValueOnce([mockPatient]) // Checking if patient exists
    .mockResolvedValueOnce() // Update patient data, nothing returned

    const req = { query: { givenname: 'Johnny' } };
    const args = { id: '123' };
    const result = await patch(args, { req });

    expect(result).toEqual({
    id: '123',
    resource_version: undefined,
    created: false,
    });

    expect(db.query).toHaveBeenCalledWith("SELECT * FROM patients WHERE identifier = $1", ['123']);
    expect(db.query).toHaveBeenCalledWith("UPDATE patients SET givenname = $1 WHERE identifier = 123", ['Johnny']);
});

it('should throw an error if patient is not found', async () => {
    db.query.mockResolvedValueOnce([]);

    const req = { query: { givenname: 'NonExistent' } };
    const args = { id: '123' };

    await expect(patch(args, { req })).rejects.toThrow('Unable to locate patient with ID: 123');
});
});

describe('DELETE /Patient/:id', () => {
    it('should delete patient data and return a success response', async () => {
        const mockPatient = { identifier: '123', givenname: 'John', familyname: 'Doe' };

        db.query
        .mockResolvedValueOnce([mockPatient]) // Checkin if patient exists
        .mockResolvedValueOnce(); // Delete patient data, nothing returned

        const args = { id: '123' };
        await remove(args);

        expect(db.query).toHaveBeenCalledWith("SELECT * FROM patients WHERE identifier = $1", ['123']);
        expect(db.query).toHaveBeenCalledWith("DELETE FROM patients WHERE identifier = $1", ['123']);
    });

    it('should throw an error if patient is not found', async () => {
        db.query.mockResolvedValueOnce([]);

        const args = { id: '123' };

        await expect(remove(args)).rejects.toThrow('Unable to locate patient with ID: 123');
    });
});


