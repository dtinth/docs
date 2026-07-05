<!-- Generated from src/help/topics.ts — do not edit directly. Run `vp run docs` to regenerate. -->

# Working with Attachments

Attachment operations are available via `doc.attachments`.

## upload

Uploads one or more files and returns their attachment IDs. These IDs can be stored in `Attachments`-typed columns.

```ts
const [id] = await doc.attachments.upload([
  { filename: "report.pdf", data: pdfBuffer, type: "application/pdf" },
]);
```

Accepts `File`, `Blob`, or an object with `filename`, `data` (a `Blob`, `Uint8Array`, or `ArrayBuffer`), and an optional `type`.

## get

Retrieves metadata for an attachment by ID.

```ts
const meta = await doc.attachments.get(id);
console.log(meta.fileName, meta.fileSize, meta.timeUploaded);
```

## download

Downloads an attachment as a `Blob`.

```ts
const blob = await doc.attachments.download(id);
```

## downloadStream

Downloads an attachment as a readable byte stream.

```ts
const stream = await doc.attachments.downloadStream(id);
```

## API reference

- [GristAttachments](https://apiref-site.vercel.app/package/grist-kit/GristAttachments) — attachment client
