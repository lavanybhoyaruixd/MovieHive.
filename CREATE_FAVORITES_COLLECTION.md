# Create Favorites Collection in Appwrite

## 🚨 Collection Not Found Error

The error "Collection with the requested ID could not be found" means we need to create the collection properly in Appwrite.

---

## 📋 Step-by-Step Collection Setup

### Step 1: Access Appwrite Console
1. Go to https://cloud.appwrite.io/
2. Login to your account
3. Select your project: `68a37c77001a4d04ad0f`

### Step 2: Navigate to Database
1. Click on **"Databases"** in the left sidebar
2. Select your database: `68a37e7a00266a118f6d`

### Step 3: Create New Collection
1. Click **"Create Collection"**
2. **Collection Name**: `favorites`
3. **Collection ID**: Leave empty (auto-generated) or use: `favorites`
4. Click **"Create"**

### Step 4: Add Attributes
Add these attributes one by one:

#### Required Attributes:
1. **userId**
   - Type: `String`
   - Size: `255`
   - Required: ✅ Yes
   - Array: ❌ No

2. **movieId**
   - Type: `String`
   - Size: `50`
   - Required: ✅ Yes
   - Array: ❌ No

3. **title**
   - Type: `String`
   - Size: `500`
   - Required: ✅ Yes
   - Array: ❌ No

4. **addedAt**
   - Type: `DateTime`
   - Required: ✅ Yes
   - Array: ❌ No

#### Optional Attributes:
5. **poster_path**
   - Type: `String`
   - Size: `255`
   - Required: ❌ No
   - Array: ❌ No

6. **release_date**
   - Type: `String`
   - Size: `20`
   - Required: ❌ No
   - Array: ❌ No

7. **vote_average**
   - Type: `Float`
   - Required: ❌ No
   - Array: ❌ No

8. **original_language**
   - Type: `String`
   - Size: `10`
   - Required: ❌ No
   - Array: ❌ No

9. **overview**
   - Type: `String`
   - Size: `2000`
   - Required: ❌ No
   - Array: ❌ No

10. **genre_ids**
    - Type: `Integer`
    - Required: ❌ No
    - Array: ✅ Yes

### Step 5: Set Indexes (for better performance)
1. Click **"Indexes"** tab
2. Add these indexes:

#### Index 1: User Movies Index
- **Key**: `user_movies`
- **Type**: `key`
- **Attributes**: `userId`, `movieId`

#### Index 2: User Added Date Index
- **Key**: `user_date`
- **Type**: `key`
- **Attributes**: `userId`, `addedAt`

### Step 6: Set Permissions
1. Click **"Settings"** tab
2. Under **"Permissions"**, add these rules:

#### Document Level Permissions:
- **Read**: `users`
- **Create**: `users`
- **Update**: `users`
- **Delete**: `users`

Or for more security (user-specific):
- **Read**: `user:[USER_ID]` (will be set programmatically)
- **Create**: `users`
- **Update**: `user:[USER_ID]`
- **Delete**: `user:[USER_ID]`

### Step 7: Get Collection ID
1. After creating, note the **Collection ID** from the collection settings
2. It should be something like: `675xxxxxxxxxxxxx`

---

## 🔧 Update Your Configuration

Once you have the correct Collection ID, update your `.env` file:

```env
VITE_APPWRITE_FAVORITES_COLLECTION_ID=YOUR_NEW_COLLECTION_ID
```

---

## 🧪 Quick Test Script

After setting up, run this in your browser console:

```javascript
// Test the setup
verifySetup.runAllTests()
```

This will verify:
- ✅ Environment variables are set
- ✅ Database connection works  
- ✅ Collection is accessible
- ✅ Document creation/deletion works

---

## 🎯 Alternative: Use Existing Collection

If you want to use an existing collection, you can:

1. **Check existing collections** in your database
2. **Find the correct Collection ID** 
3. **Add missing attributes** to match our schema
4. **Update permissions** as needed

---

## ⚡ Quick Fix: Use localStorage

If you want to test immediately while setting up Appwrite:

```javascript
// Switch to hybrid service (localStorage fallback)
// In src/contexts/FavoritesContext.jsx, change import to:
import favoritesService from '../services/hybridFavoritesService';
```

This will use localStorage until Appwrite is properly configured.

---

## 📞 Need Help?

If you encounter issues:
1. Double-check your project ID and database ID in Appwrite console
2. Make sure you're logged into the correct Appwrite account
3. Verify the collection exists in the correct database
4. Check that permissions are set to allow user access

The collection ID format should be: `6xxxxxxxxxxxxxxxxxx` (24 characters)

Let me know the new Collection ID once you create it!