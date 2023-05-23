--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Ubuntu 15.2-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.2 (Ubuntu 15.2-1.pgdg20.04+1)

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
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: shortens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shortens (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    views integer DEFAULT 0 NOT NULL
);


--
-- Name: shortens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shortens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shortens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shortens_id_seq OWNED BY public.shortens.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: shortens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens ALTER COLUMN id SET DEFAULT nextval('public.shortens_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, '4a0cfba0-0660-4f26-a31f-97d4bf5b0b9c', true, 1, '2023-05-23 17:41:59.062347');
INSERT INTO public.sessions VALUES (2, 'b3dcc7e6-09dc-4d50-a49c-ff4a9c94a208', true, 2, '2023-05-23 17:41:59.062347');
INSERT INTO public.sessions VALUES (3, 'bd8a4bb4-7256-43b1-a8a9-b57849a4e919', true, 3, '2023-05-23 17:41:59.062347');
INSERT INTO public.sessions VALUES (4, 'd38c7738-e3f9-4b1e-a491-efd8e64c6164', true, 5, '2023-05-23 17:41:59.062347');
INSERT INTO public.sessions VALUES (5, '0ba85bf2-3e1c-4bb4-a18a-7cbccc9eee90', true, 5, '2023-05-23 17:41:59.062347');
INSERT INTO public.sessions VALUES (6, '54258d87-05c2-43c0-9838-e41c38edd3bf', true, 5, '2023-05-23 17:41:59.062347');
INSERT INTO public.sessions VALUES (7, 'd1fe4a25-8822-408c-814b-93e17ed1234f', true, 5, '2023-05-23 17:41:59.062347');
INSERT INTO public.sessions VALUES (8, 'b87c0594-dfe5-41a6-b43b-f5722971bf5b', true, 1, '2023-05-23 17:41:59.062347');
INSERT INTO public.sessions VALUES (9, '3f40dd56-a52e-4d1b-bd56-272e34f569d1', true, 5, '2023-05-23 17:41:59.062347');
INSERT INTO public.sessions VALUES (10, '39eb0482-c789-44d9-8ff9-c16c5ceeeaa4', true, 1, '2023-05-23 17:41:59.062347');
INSERT INTO public.sessions VALUES (11, 'd2d9d57c-43e0-41ae-bee3-f161edf54998', true, 5, '2023-05-23 17:41:59.062347');


--
-- Data for Name: shortens; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.shortens VALUES (1, 'https://www.google.com.br', 'eg6bnkk1', 1, '2022-12-23 15:52:29.867043', 5);
INSERT INTO public.shortens VALUES (3, 'https://www.instagram.com.br', 'I_0AXuhb', 1, '2022-12-23 16:25:56.523454', 2);
INSERT INTO public.shortens VALUES (4, 'https://www.instagram.com.br', 'wW0ER0Ni', 2, '2022-12-23 16:34:26.116371', 0);
INSERT INTO public.shortens VALUES (5, 'https://www.google.com.br', '4BCfyAeC', 5, '2022-12-23 19:45:45.428325', 0);
INSERT INTO public.shortens VALUES (6, 'https://www.google.com.br', 'Tu-hv_Jb', 5, '2022-12-23 20:40:05.425947', 0);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'joao@driven.com.br', '$2b$10$gnr.fAVPT9.dAsr7Bba3uOcv7QYNgKQ/EioHZPkasxhGktuPpK6JO', 'João', '2022-12-23 15:49:43.781264');
INSERT INTO public.users VALUES (2, 'thi@driven.com.br', '$2b$10$dQ7LUnJuUPJXfOWpcGgnYeUFGFcDQ2FbM0ZgfNvMep446nQMgmoEm', 'Thiago', '2022-12-23 16:34:06.881847');
INSERT INTO public.users VALUES (3, 'ma@driven.com.br', '$2b$10$.Zb47ol2OfMpYH8/tFfBEOqnOVNdoWcrM3cACg6TdxLLg7um3xIs6', 'Marjory', '2022-12-23 16:34:48.914065');
INSERT INTO public.users VALUES (4, 'ju@driven.com.br', '$2b$10$4zfkTJeq8nIj2rVplG8nJ.554zryabvSMp8Wcrdf.wCJJDlCqyTGe', 'Julia', '2022-12-23 19:07:50.975407');
INSERT INTO public.users VALUES (5, 'ca@driven.com.br', '$2b$10$y4.yzwopQaeGOmYqTVRf1.5eI0P9oPuA/jMEWbOTwT8k12PT1oryS', 'Cacau', '2022-12-23 19:13:04.15131');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 1, false);


--
-- Name: shortens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shortens_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: shortens shortens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens
    ADD CONSTRAINT shortens_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: shortens shortens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens
    ADD CONSTRAINT "shortens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

