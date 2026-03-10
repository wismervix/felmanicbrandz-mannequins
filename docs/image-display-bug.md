# Bug Report: Product Images Not Displaying in Preview/Edit Mode

**Date:** 2026-03-10
**Severity:** High
**Status:** Open
**Affects:** Admin product create, product edit, guest product display, and production (Railway) deployment

---

## Summary

After adding a product with images, the images fail to load in the preview or edit form. The files are successfully uploaded and stored on the server, but the browser cannot access them via the constructed URL because the Laravel public storage symlink is missing and no static file serving route exists.

---

## Symptoms

- Thumbnail and additional images show a blank/broken image after product creation
- In edit mode, existing product images do not render
- Guest-facing product cards show no image
- Network tab shows `GET http://127.0.0.1:8000/storage/<filename>` returning 404

---

## Root Cause Analysis

### 1. Missing Storage Symlink (Primary Cause)

Laravel requires a symlink from `public/storage` → `storage/app/public/` to serve uploaded files over HTTP. This symlink is **not present** in the repository.

- **Files are stored at:** `storage/app/public/<filename>`
- **URL constructed by frontend:** `http://127.0.0.1:8000/storage/<filename>`
- **Web root:** `public/` — has no `storage/` directory or symlink inside it
- **Result:** 404 on every image request

The symlink is created by running `php artisan storage:link` and is typically gitignored, so it must be run locally after cloning the repo.

### 2. URL Construction Logic (Frontend)

**File:** `src/app/core/services/api.service.ts`

```typescript
getMediaUrl(path?: string | null): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${this.baseUrl.replace('/api', '/storage/')}${path}`;
}
```

- Base URL: `http://127.0.0.1:8000/api`
- Constructed URL: `http://127.0.0.1:8000/storage/<filename>`

This logic is correct **only if** the symlink exists. Without the symlink, all URLs return 404.

### 3. Backend Stores Only Filename (No Subdirectory)

**File:** `app/Http/Controllers/Api/ProductController.php`

```php
$thumbnail = $request->file('thumbnail')->store('', 'public');
```

The empty string `''` as the store path means files land directly in `storage/app/public/` with no subfolder. The stored value in the database is the raw filename (e.g., `9PVkVpyEHIb1IqW6UFk3ARz0dogtfABHAd0fFYkr.png`).

The frontend then constructs: `http://127.0.0.1:8000/storage/9PVkVpyEHIb1IqW6UFk3ARz0dogtfABHAd0fFYkr.png`

This is correct, but again depends on the symlink being present.

### 4. No Middleware or Route for Static File Serving

**File:** `routes/web.php` — only contains the default welcome route.
**File:** `bootstrap/app.php` — middleware configuration is empty.

There is no fallback route or middleware to serve files from storage if the symlink is absent.

---

## Image Flow Diagram

```
CREATE PRODUCT WITH IMAGES
──────────────────────────
1. User selects files → browser creates object URL (blob:) for instant preview ✅
2. Frontend POSTs product data (no files) → backend creates product record ✅
3. Frontend POSTs FormData to POST /api/products/{id}/images ✅
4. Backend stores files → storage/app/public/<filename> ✅
5. Backend saves filename to DB, returns updated product ✅
6. Frontend updates store with response ✅
7. Frontend calls getMediaUrl(filename) → http://127.0.0.1:8000/storage/<filename>
8. Browser fetches URL → 404 NOT FOUND ❌  (symlink missing)

EDIT PRODUCT
────────────
1. Product loaded from store/API with stored filename ✅
2. getMediaUrl(filename) → http://127.0.0.1:8000/storage/<filename>
3. Image displayed in form preview → 404 NOT FOUND ❌  (symlink missing)
```

---

## Files Involved

### Frontend (Angular)

| File | Role |
|------|------|
| `src/app/core/services/api.service.ts` | `getMediaUrl()` — constructs image URLs |
| `src/app/core/models/products.model.ts` | `images: string[]`, `thumbnail: string` fields |
| `src/app/core/data/products.store.ts` | `uploadImages()` — POSTs files, updates store |
| `src/app/admin/features/products/components/product-form/product-form.ts` | Handles file selection, existing image loading |
| `src/app/admin/features/products/components/product-form/product-form.html` | Railways image previews |
| `src/app/admin/features/products/pages/product-create-page/product-create-page.ts` | Orchestrates create + upload |
| `src/app/admin/features/products/pages/product-edit-page/product-edit-page.ts` | Orchestrates edit + upload |
| `src/app/guest/shared/components/each-product/each-product.ts` | Guest product card image display |

### Backend (Laravel)

| File | Role |
|------|------|
| `app/Http/Controllers/Api/ProductController.php` | `uploadImages()` — stores files, updates DB |
| `app/Models/Product.php` | `images` (JSON array), `thumbnail` (string) fields |
| `config/filesystems.php` | Public disk config, symlink definition |
| `routes/api.php` | `POST /api/products/{product}/images` route |
| `public/` | Web root — **missing** `storage/` symlink |
| `storage/app/public/` | Actual file storage location |

---

## Fix

### Step 1 — Create the Storage Symlink (Required)

Run this once in the Laravel project root:

```bash
php artisan storage:link
```

This creates `public/storage → storage/app/public/`, making uploaded files accessible at `http://127.0.0.1:8000/storage/<filename>`.

> **Note for Windows:** If the command fails due to permissions, run the terminal as Administrator, or manually create the symlink:
> ```
> mklink /D C:\WebPhoenix\personal\felmanicbrandz-mannequins-api\public\storage C:\WebPhoenix\personal\felmanicbrandz-mannequins-api\storage\app\public
> ```

### Step 2 — Add Setup Note to README / onboarding docs

Document that `php artisan storage:link` must be run after cloning the backend repo, so future developers don't hit the same issue.

### Step 3 (Optional) — Organise Uploads into Subdirectory

Currently all images land in the root of `storage/app/public/`. Consider storing in a `products/` subdirectory:

```php
// ProductController.php
$thumbnail = $request->file('thumbnail')->store('products', 'public');
```

This keeps storage organised and makes cleanup easier.

---

## What Works Today

- File selection and temporary blob URL preview during upload session ✅
- FormData construction and HTTP upload to backend ✅
- Backend file storage to `storage/app/public/` ✅
- Database path recording ✅
- API response with correct relative path ✅

## What Is Broken

- Persistent image display after page reload or navigation ❌
- Image display in edit form ❌
- Guest product card images ❌

---

## Verification After Fix

1. Run `php artisan storage:link`
2. Create a new product with a thumbnail and images
3. Navigate to the product list — images should appear on guest cards
4. Open the product in edit mode — images should render in the form
5. Check network tab — `GET /storage/<filename>` should return 200

---

---

## Production (Railway) — Additional Concerns

The symlink problem also exists on Railway, but the deployment environment introduces a **more severe issue on top of it**.

### Ephemeral Filesystem

Railway containers use an **ephemeral filesystem** — the disk resets on every redeploy or container restart. This means:

1. `php artisan storage:link` must be re-run on every deploy (add it to the start command)
2. Even if the symlink is created at build time, any files uploaded after deploy live only on the container's local disk until the next redeploy or restart, at which point they are **permanently deleted**

### Consequence

- Images upload successfully and appear to work
- After the next Railway deploy (or instance restart), all uploaded images are gone
- Database still references the old filenames — broken image URLs permanently

### Fix for Production: External Object Storage

Switch from local disk storage to a cloud object storage service. Laravel supports this natively.

**Recommended: Cloudflare R2** (S3-compatible, generous free tier)

**Step 1 — Install the S3 adapter**
```bash
composer require league/flysystem-aws-s3-v3
```

**Step 2 — Configure the S3/R2 disk** in `config/filesystems.php`
```php
's3' => [
    'driver' => 's3',
    'key'    => env('AWS_ACCESS_KEY_ID'),
    'secret' => env('AWS_SECRET_ACCESS_KEY'),
    'region' => env('AWS_DEFAULT_REGION', 'auto'),
    'bucket' => env('AWS_BUCKET'),
    'url'    => env('AWS_URL'),          // your R2 public URL or custom domain
    'endpoint'   => env('AWS_ENDPOINT'), // R2: https://<account>.r2.cloudflarestorage.com
    'use_path_style_endpoint' => true,
],
```

**Step 3 — Update `.env`** (local and Railway environment variables)
```
FILESYSTEM_DISK=s3
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_DEFAULT_REGION=auto
AWS_BUCKET=your-bucket-name
AWS_ENDPOINT=https://<account_id>.r2.cloudflarestorage.com
AWS_URL=https://pub-<hash>.r2.dev   # or your custom domain
```

**Step 4 — Update controller** to use `s3` disk explicitly (or rely on the default disk env var)
```php
// ProductController.php — no code change needed if FILESYSTEM_DISK=s3 in .env
// Laravel will use the default disk automatically
$thumbnail = $request->file('thumbnail')->store('products', 's3');
```

**Step 5 — Update `getMediaUrl()` in frontend**

With S3/R2 the backend should return the full public URL directly, not just a filename. Update `uploadImages()` response handling or have the backend return `Storage::url($path)` instead of the raw path:

```php
// ProductController.php — when returning the product after upload
$product->thumbnail = Storage::disk('s3')->url($thumbnail);
```

Then `getMediaUrl()` in `api.service.ts` already handles this — it detects `http` prefix and returns the URL as-is:
```typescript
if (path.startsWith('http')) return path; // ✅ already handled
```

### Railway Start Command

Add `storage:link` to the Railway start command as a stopgap for local disk (not sufficient alone — still ephemeral):
```bash
php artisan storage:link && php artisan serve --host=0.0.0.0 --port=$PORT
```

Set this in Railway → your service → **Settings → Start Command**.

---

## Summary: Fix by Environment

| Environment | Problem | Fix |
|-------------|---------|-----|
| Local dev | Missing symlink | `php artisan storage:link` |
| Railway (production) | Missing symlink + ephemeral disk | Switch to Cloudflare R2 / S3 |

---

## Related

- Laravel Docs: [File Storage — The Public Disk](https://laravel.com/docs/filesystem#the-public-disk)
- Frontend API service: `src/app/core/services/api.service.ts` — `getMediaUrl()`
- Backend controller: `app/Http/Controllers/Api/ProductController.php` — `uploadImages()`
