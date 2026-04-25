DO $$
DECLARE
  generated_promo_code text;
BEGIN
  generated_promo_code :=
    upper(
      substr(md5(random()::text || clock_timestamp()::text), 1, 6) ||
      '-' ||
      substr(md5((random() * 1000000)::text || clock_timestamp()::text), 1, 6) ||
      '-' ||
      substr(md5((random() * 1000000)::text || txid_current()::text), 1, 6)
    );

  INSERT INTO public.promo_codes (
    code,
    "isActive",
    "validFrom",
    "validUntil"
  )
  VALUES (
    generated_promo_code,
    true,
    now(),
    now() + interval '30 days'
  );

  RAISE NOTICE 'Test promo code: %', generated_promo_code;
END $$;

SELECT
  code,
  "isActive",
  "validFrom",
  "validUntil",
  "createdAt"
FROM public.promo_codes
ORDER BY id DESC
LIMIT 1;
