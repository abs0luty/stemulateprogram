CREATE TABLE public.applications (
  createdAt timestamp with time zone NOT NULL DEFAULT now(),
  city text,
  country text,
  phone text,
  ieltsScore text,
  satScore text,
  schoolName text,
  grade text,
  gpa text,
  parentPhone text,
  parentEmail text,
  firstName text,
  fieldsOfInterest ARRAY,
  researchInterest text,
  promoCode text,
  extracurriculars text,
  createdBy uuid NOT NULL DEFAULT auth.uid() UNIQUE,
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  lastName text,
  parentFirstName text,
  parentLastName text,
  CONSTRAINT applications_pkey PRIMARY KEY (id, createdBy)
);

CREATE TABLE public.promo_codes (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code text NOT NULL,
  "normalizedCode" text GENERATED ALWAYS AS (upper(btrim(code))) STORED,
  "isActive" boolean NOT NULL DEFAULT true,
  "validFrom" timestamp with time zone,
  "validUntil" timestamp with time zone,
  "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
  "updatedAt" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT promo_codes_code_not_blank CHECK (btrim(code) <> ''),
  CONSTRAINT promo_codes_valid_window CHECK (
    "validUntil" IS NULL OR "validFrom" IS NULL OR "validUntil" >= "validFrom"
  )
);

CREATE UNIQUE INDEX promo_codes_normalized_code_key
ON public.promo_codes ("normalizedCode");

CREATE OR REPLACE FUNCTION public.is_valid_promo_code(candidate text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.promo_codes
    WHERE "normalizedCode" = upper(btrim(coalesce(candidate, '')))
      AND "isActive" = true
      AND ("validFrom" IS NULL OR "validFrom" <= now())
      AND ("validUntil" IS NULL OR "validUntil" >= now())
  );
$$;

CREATE OR REPLACE FUNCTION public.check_promo_code(candidate text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.is_valid_promo_code(candidate);
$$;

CREATE OR REPLACE FUNCTION public.validate_application_promo_code()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW."promoCode" IS NULL OR btrim(NEW."promoCode") = '' THEN
    NEW."promoCode" := NULL;
    RETURN NEW;
  END IF;

  NEW."promoCode" := upper(btrim(NEW."promoCode"));

  IF NOT public.is_valid_promo_code(NEW."promoCode") THEN
    RAISE EXCEPTION 'Invalid promo code'
      USING ERRCODE = '23514';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_application_promo_code_before_write
ON public.applications;

CREATE TRIGGER validate_application_promo_code_before_write
BEFORE INSERT OR UPDATE OF "promoCode"
ON public.applications
FOR EACH ROW
EXECUTE FUNCTION public.validate_application_promo_code();
