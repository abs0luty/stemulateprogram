alter table "public"."promo_codes" enable row level security;

revoke all on table "public"."promo_codes" from anon, authenticated;

revoke all on function "public"."is_valid_promo_code"(text) from public;
revoke all on function "public"."check_promo_code"(text) from public;

grant execute on function "public"."check_promo_code"(text) to authenticated;
