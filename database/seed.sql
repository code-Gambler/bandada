-- Table Definition ----------------------------------------------

CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    service text NOT NULL,
    "userId" character varying NOT NULL,
    "accessToken" character varying NOT NULL,
    "refreshToken" character varying,
    username character varying NOT NULL,
    "fullName" character varying,
    "avatarURL" character varying NOT NULL,
    "createdAt" timestamp without time zone NOT NULL DEFAULT now()
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX "PK_5a7a02c20412299d198e097a8fe" ON accounts(id int4_ops);
CREATE UNIQUE INDEX "IDX_477e3187cedfb5a3ac121e899c" ON accounts(username text_ops);


-- DDL generated by Postico 2.0 RC 6
-- Not all database features are supported. Do not use for backup.

-- Table Definition ----------------------------------------------

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name character varying NOT NULL,
    description character varying NOT NULL,
    admin character varying NOT NULL,
    "treeDepth" integer NOT NULL,
    members text NOT NULL,
    "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
    tag integer NOT NULL DEFAULT 0
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX "PK_659d1483316afb28afd3a90646e" ON groups(id int4_ops);
CREATE UNIQUE INDEX "IDX_664ea405ae2a10c264d582ee56" ON groups(name text_ops);


-- DDL generated by Postico 2.0 RC 6
-- Not all database features are supported. Do not use for backup.

-- Table Definition ----------------------------------------------

CREATE TABLE invites (
    id SERIAL PRIMARY KEY,
    code character varying NOT NULL,
    redeemed boolean NOT NULL DEFAULT false,
    "groupId" integer REFERENCES groups(id)
);

-- Indices -------------------------------------------------------

CREATE UNIQUE INDEX "PK_aa52e96b44a714372f4dd31a0af" ON invites(id int4_ops);
CREATE UNIQUE INDEX "IDX_33fd8a248db1cd832baa8aa25b" ON invites(code text_ops);
