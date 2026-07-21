## ADDED Requirements

### Requirement: vCard derived from portfolio content

The system SHALL generate the vCard from `portfolioContent` via a pure function `buildVCard` in `src/lib/vcard.ts` — the vCard MUST NOT be hand-maintained as a static file. The output SHALL be vCard version 3.0 with CRLF line endings and MUST include `FN`, `N`, `TITLE`, `ORG`, `TEL;TYPE=CELL`, `EMAIL`, and `URL` fields populated from content; empty content fields SHALL be omitted from the output.

#### Scenario: vCard reflects content

- **WHEN** `buildVCard` is called with the current profile and business card content
- **THEN** the output contains `BEGIN:VCARD`, `VERSION:3.0`, the profile name, email, phone, and `END:VCARD`

#### Scenario: Special characters are escaped

- **WHEN** a content field contains `,`, `;`, or a newline
- **THEN** the character is escaped per the vCard specification

### Requirement: vCard download endpoint

The system SHALL serve the vCard at `/card/vcard` via a route handler with `Content-Type: text/vcard; charset=utf-8` and `Content-Disposition: attachment; filename="esneider-bravo.vcf"`, statically generated at build time.

#### Scenario: Save contact on mobile

- **WHEN** a visitor taps "Save contact" on iOS or Android
- **THEN** the browser downloads/opens the `.vcf` and the native add-contact flow is offered

#### Scenario: Correct headers

- **WHEN** a GET request is made to `/card/vcard`
- **THEN** the response has status 200, `text/vcard` content type, and an attachment disposition with the `.vcf` filename
