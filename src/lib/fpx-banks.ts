// Standard FPX (PayNet) participating banks for B2C / retail online-banking payments.
// Shown for any gateway that offers the `fpx` channel; the bank set is national and
// standardised by PayNet, so it is NOT duplicated per gateway.
//
// Source: PayNet Knowledge Base "Which banks participate in FPX?" +
//         PayNet FPX List of Financial Institution Code (Production B2C).
// Verified: 2026-06-24.
export const FPX_BANKS: readonly string[] = [
  "Affin Bank",
  "Agrobank",
  "Alliance Bank",
  "AmBank",
  "Bank Islam",
  "Bank Muamalat",
  "Bank Of China",
  "Bank Rakyat",
  "BSN",
  "CIMB",
  "Hong Leong Bank",
  "HSBC Bank",
  "Kuwait Finance House",
  "Maybank",
  "OCBC Bank",
  "Public Bank",
  "RHB Bank",
  "Standard Chartered",
  "UOB Bank",
];

export const FPX_BANKS_SOURCE =
  "https://knowledgebase.paynet.my/hc/en-us/articles/49685463748121-Which-banks-participate-in-FPX";
export const FPX_BANKS_VERIFIED = "2026-06-24";
