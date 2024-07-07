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
    givenname character varying(50),
    familyname character varying(50),
    telecom character varying(30),
    gender character varying(10),
    birthdate date,
    deceased boolean,
    address character varying(100),
    maritalstatus character varying(10),
    contactgivenname character varying(50),
    contactfamilyname character varying(50),
    contactrelationship character varying(30),
    contacttelecom character varying(30),
    contactaddress character varying(100),
    contactgender character varying(10),
    communication character varying(30),
    generalpractitioner character varying(50),
    managingorganisation character varying(50),
    CONSTRAINT patients_gender_check CHECK (((gender)::text = ANY ((ARRAY['male'::character varying, 'female'::character varying, 'other'::character varying, 'unknown'::character varying])::text[]))),
    CONSTRAINT patients_maritalstatus_check CHECK (((maritalstatus)::text = ANY ((ARRAY['S'::character varying, 'M'::character varying, 'D'::character varying])::text[])))
);


ALTER TABLE public.patients OWNER TO postgres;



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

