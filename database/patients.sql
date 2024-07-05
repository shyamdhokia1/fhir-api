--
-- PostgreSQL database dump
--

-- Dumped from database version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.12 (Ubuntu 14.12-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: patients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patients (
    identifier integer NOT NULL,
    active boolean,
    name character varying(50),
    telecom character varying(30),
    gender character varying(10),
    birthdate date,
    deceased boolean,
    address character varying(100),
    maritalstatus character varying(10),
    contactname character varying(50),
    contactrelationship character varying(30),
    contacttelecom character varying(30),
    contactaddress character varying(100),
    contactgender character varying(10),
    communication character varying(30),
    generalpractitioner character varying(50),
    managingorganisation character varying(50),
    CONSTRAINT patients_gender_check CHECK (((gender)::text = ANY ((ARRAY['male'::character varying, 'female'::character varying, 'other'::character varying, 'unknown'::character varying])::text[]))),
    CONSTRAINT patients_gender_check1 CHECK (((gender)::text = ANY ((ARRAY['male'::character varying, 'female'::character varying, 'other'::character varying, 'unknown'::character varying])::text[]))),
    CONSTRAINT patients_maritalstatus_check CHECK (((maritalstatus)::text = ANY ((ARRAY['single'::character varying, 'married'::character varying, 'divorced'::character varying])::text[])))
);


ALTER TABLE public.patients OWNER TO postgres;

--
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.patients (identifier, active, name, telecom, gender, birthdate, deceased, address, maritalstatus, contactname, contactrelationship, contacttelecom, contactaddress, contactgender, communication, generalpractitioner, managingorganisation) FROM stdin;
1	t	Jane Doe	(555)555-1212	female	1975-11-21	f	456 Elm St, Anytown, CA 90210	married	John Doe	Spouse	(555)555-1213	456 Elm St, Anytown, CA 90210	male	English	Dr. Smith, Happy Family Clinic	General Hospital
2	t	Alice Smith	(555)555-1214	female	1980-02-14	f	789 Maple St, Anytown, NY 10001	single	David Smith	Father	(555)555-1215	789 Maple St, Anytown, NY 10001	male	English	Dr. Jones, City Clinic	Mercy Hospital
3	t	Bob Lee	(555)555-1216	male	1990-07-28	f	123 Main St, Anytown, CA 94109	married	Emily Lee	Wife	(555)555-1217	123 Main St, Anytown, CA 94109	female	Spanish	Dr. Williams, Uptown Care	Mount Sinai Hospital
4	t	Charlie Brown	(555)555-1218	male	1985-12-05	f	45 Elm St, Anytown, WY 82001	single	Lucy van Pelt	Friend	(555)555-1219	45 Elm St, Anytown, WY 82001	female	English	Dr. Harris, Mountain View Clinic	St. Jude Hospital
5	t	David Miller	(555)555-1220	male	1970-06-21	f	78 Maple St, Anytown, TX 78750	divorced	Sarah Miller	Ex-Wife	(555)555-1221	78 Maple St, Anytown, TX 78750	female	French	Dr. Rodriguez, Central Clinic	Memorial Hospital
6	t	Emily Garcia	(555)555-1222	female	1982-09-10	f	123 Oak St, Anytown, FL 33131	married	Daniel Garcia	Husband	(555)555-1223	123 Oak St, Anytown, FL 33131	male	Spanish	Dr. Hernandez, South Beach Clinic	Miami General Hospital
7	t	Frank Hernandez	(555)555-1224	male	1965-01-18	f	456 Palm St, Anytown, CA 90210	married	Susan Hernandez	Wife	(555)555-1225	456 Palm St, Anytown, CA 90210	female	English	Dr. Kapoor, Sunset Clinic	Cedars-Sinai Medical Center
8	t	Grace Johnson	(555)555-1226	female	1995-03-07	f	789 Pine St, Anytown, OR 97203	single	William Johnson	Father	(555)555-1227	789 Pine St, Anytown, OR 97203	male	English	Dr. Chen, Evergreen Clinic	Providence Hospital
9	t	Olivia King	(555)555-1228	female	1972-10-26	f	123 Elm St, Anytown, VA 23456	married	Charles King	Husband	(555)555-1229	123 Elm St, Anytown, VA 23456	male	English	Dr. Young, Riverview Clinic	Virginia Mason Hospital
10	t	Ethan Miller	(555)555-1230	male	1988-05-14	f	456 Maple St, Anytown, IL 60601	single	David Miller	Father	(555)555-1231	456 Maple St, Anytown, IL 60601	male	English	Dr. Patel, Lakeview Clinic	Northwestern Memorial Hospital
11	t	Sophia Garcia	(555)555-1232	female	1990-08-03	f	789 Oak St, Anytown, TX 75001	single	Emily Garcia	Sister	(555)555-1222	123 Oak St, Anytown, FL 33131	female	Spanish	Dr. Rodriguez, Central Clinic	Memorial Hospital
12	t	William Brown	(555)555-1233	male	1968-12-21	f	123 Main St, Anytown, WY 82002	married	Lucy van Pelt	Wife	(555)555-1219	45 Elm St, Anytown, WY 82001	female	English	Dr. Harris, Mountain View Clinic	St. Jude Hospital
13	t	Elizabeth Hernandez	(555)555-1234	female	1979-04-07	f	456 Palm St, Anytown, CA 90211	married	Frank Hernandez	Husband	(555)555-1224	456 Palm St, Anytown, CA 90210	male	English	Dr. Kapoor, Sunset Clinic	Cedars-Sinai Medical Center
14	t	Noah Johnson	(555)555-1235	male	1992-02-11	f	789 Pine St, Anytown, OR 97204	single	Grace Johnson	Sister	(555)555-1226	789 Pine St, Anytown, OR 97203	female	English	Dr. Chen, Evergreen Clinic	Providence Hospital
15	t	Isabella Lee	(555)555-1236	female	1987-09-25	f	123 Elm St, Anytown, NY 10002	married	David Smith	Husband	(555)555-1215	789 Maple St, Anytown, NY 10001	male	English	Dr. Jones, City Clinic	Mercy Hospital
16	t	Benjamin Miller	(555)555-1237	male	1985-03-09	f	456 Maple St, Anytown, IL 60602	single	Ethan Miller	Brother	(555)555-1230	456 Maple St, Anytown, IL 60601	male	English	Dr. Patel, Lakeview Clinic	Northwestern Memorial Hospital
17	t	Sofia Garcia	(555)555-1238	female	1998-01-12	f	789 Oak St, Anytown, TX 75002	single	Sophia Garcia	Twin Sister	(555)555-1232	789 Oak St, Anytown, TX 75001	female	Spanish	Dr. Rodriguez, Central Clinic	Memorial Hospital
18	t	Ashley Hernandez	(555)555-1243	female	1997-05-12	f	45 Maple St, Anytown, CA 90212	single	Frank Hernandez	Father	(555)555-1224	456 Palm St, Anytown, CA 90210	male	English	Dr. Kapoor, Sunset Clinic	Cedars-Sinai Medical Center
19	t	Olivia Jones	(555)555-1240	female	1990-01-05	f	456 Elm St, Anytown, WA 98001	married	David Jones	Husband	(555)555-1241	456 Elm St, Anytown, WA 98001	male	English	Dr. Brown, Evergreen Clinic	Swedish Medical Center
20	t	William Garcia	(555)555-1242	male	1978-11-23	f	789 Oak St, Anytown, FL 33132	divorced	Sophia Garcia	Sister	(555)555-1232	789 Oak St, Anytown, FL 33132	female	Spanish	Dr. Rodriguez, Central Clinic	Jackson Health System
\.


--
-- Name: patients patients_identifier_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_identifier_key UNIQUE (identifier);


--
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (identifier);


--
-- PostgreSQL database dump complete
--

