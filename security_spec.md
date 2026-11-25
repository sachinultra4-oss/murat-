# Security Specification — Muhurat Wedding

## 1. Data Invariants
1. **PII Isolation**: Wedding enquiry records (`/enquiries/{enquiryId}`) contain couple names, phone numbers, emails, and wedding dates. Unauthenticated visitors may ONLY `create` a new enquiry; `get`, `list`, `update`, and `delete` are strictly restricted to verified studio administrators (`isAdmin()`).
2. **Initial Status & Timestamp Integrity**: Public enquiry creation MUST have `status == 'new'`, `adminNotes == ''`, `createdAt == request.time`, and `updatedAt == request.time`.
3. **Immutable Creation Metadata**: Updates to `/enquiries/{enquiryId}` by an admin cannot alter `createdAt` or spoof `coupleName`/`email` via unrestricted keys; only `['status', 'adminNotes', 'updatedAt']` may change.
4. **Admin Bootstrapping & Spoof Protection**: Admin checks require `request.auth != null && request.auth.token.email_verified == true` alongside either the verified bootstrapped studio email or an existing `/admins/{uid}` document.

## 2. The "Dirty Dozen" Attack Payloads (Must Return PERMISSION_DENIED)
1. Unauthenticated `list` on `/enquiries` (PII scraping attempt).
2. Unauthenticated `get` on `/enquiries/{enquiryId}` (PII read attempt).
3. Unauthenticated `create` on `/enquiries/{enquiryId}` with `status: "booked"` (state shortcutting).
4. Unauthenticated `create` on `/enquiries/{enquiryId}` with `adminNotes: "Approved free shoot"` (system-field injection).
5. Unauthenticated `create` on `/enquiries/{enquiryId}` with a backdated `createdAt` timestamp (temporal spoofing).
6. Unauthenticated `create` on `/enquiries/{enquiryId}` with an extra shadow field `isVerified: true` (shadow field injection).
7. Unauthenticated `create` on `/enquiries/{enquiryId}` with a 200KB `story` string (resource exhaustion / denial of wallet).
8. Unauthenticated `create` on `/enquiries/{enquiryId}` with an oversized `enquiryId` (> 128 chars or invalid characters) (ID poisoning).
9. Unauthenticated `create` on `/enquiries/{enquiryId}` with `services: []` or `services` > 8 items (array boundary bypass).
10. Signed-in non-admin user attempting `list` or `update` on `/enquiries` (privilege escalation).
11. Signed-in user with `email == 'sachinsgagsd@gmail.com'` and `email_verified == false` attempting `list` on `/enquiries` (email spoofing attack).
12. Signed-in non-admin user attempting `create` on `/admins/{uid}` to grant themselves admin role (self-assigned role attack).
