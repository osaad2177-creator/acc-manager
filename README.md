# Account Manager — Setup Notes

This build adds Firebase Authentication + per-user client ownership on top
of your existing app. Same UI, same Firestore project, same `clients` data.

## 1. Firebase Console — enable Auth

1. Firebase Console → **Authentication** → **Sign-in method** → enable
   **Email/Password**.
2. **Authentication** → **Users** → **Add user** — create exactly 3 users:
   - Manager (your email + a password)
   - Noor (her email + a password)
   - Hussein (his email + a password)
3. Copy each new user's **UID** from that Users list — you need it for step 2.

## 2. Firestore — create the `users` profile docs

Firestore Database → `users` collection → one document per person, **document
ID = that person's Auth UID**:

```
users/{manager_uid}
{ uid: "{manager_uid}", name: "Manager", email: "...", role: "manager", active: true }

users/{noor_uid}
{ uid: "{noor_uid}", name: "Noor", email: "...", role: "team_member", active: true }

users/{hussein_uid}
{ uid: "{hussein_uid}", name: "Hussein", email: "...", role: "team_member", active: true }
```

No passwords are ever stored here — Firebase Authentication handles those.

## 3. Firestore Security Rules

Firestore Database → **Rules** → paste the contents of `firestore.rules` →
**Publish**. This removes any old `allow read, write: if true` rule and
enforces, at the database level:

- Manager: full read/write on all clients and activity.
- Noor / Hussein: can only read/write clients where `assignedTo` equals
  their own UID; can never see each other's (or unassigned) clients; can
  never change `assignedTo`, `assignedToName`, `createdBy`, or
  `createdByName`.

## 4. Existing clients

Nothing is deleted or reset. Any existing client document that has no
`assignedTo` field shows up as **Unassigned** and is visible only to the
Manager, who can open it and assign it to Noor or Hussein from the
"Assigned To" field in the edit drawer.

## 5. Index (only if Firestore prompts for one)

If the Activity Log ever shows a Firestore "index required" link in the
browser console for team-member accounts, click that link once — it's a
one-time composite index (`assignedTo` + `ts`) Firestore asks for
automatically the first time that exact query runs.

## 6. GitHub

```bash
git init
git add .
git commit -m "Add auth, ownership, and per-user access control"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

## 7. Deploy on Vercel

1. vercel.com → **Add New Project** → import the GitHub repo.
2. Framework preset: **Other** (static site) — no build command needed,
   output directory `/`.
3. Deploy. Firebase config (`firebase-config.js`) already points at your
   existing project, so no environment variables are required.
4. In Firebase Console → Authentication → Settings → **Authorized domains**,
   add your new `*.vercel.app` domain.
