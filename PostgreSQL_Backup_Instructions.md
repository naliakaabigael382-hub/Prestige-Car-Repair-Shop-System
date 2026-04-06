
# PostgreSQL Database Backup and Migration Instructions

check wheter your system system recognizes the `pg_dump` command, and it is correctly set up to use PostgreSQL version 17.1.

---

## Step 1: Export the Database
Run the following command to create a backup file:
```bash
pg_dump -U RepairServiceUsers -d CarRepairServer -F c -f "C:\Users\ADMIN1\Desktop\CarRepairServer.backup"
```

### Explanation:
- `-U RepairServiceUsers`: The username for your database.
- `-d CarRepairServer`: The name of the database you want to back up.
- `-F c`: Creates a custom format backup.
- `-f "C:\Users\ADMIN1\Desktop\CarRepairServer.backup"`: Saves the backup file to your desktop.



---

## Step 2: Verify the Backup File
Once the command completes:
1. Check if `CarRepairServer.backup` exists on your desktop.
2. Optionally, verify the backup file's contents using:
   ```bash
   pg_restore -l "C:\Users\ADMIN1\Desktop\CarRepairServer.backup"
   ```

---

## Step 3: Transfer the Backup
You can now send the file to someone else:
- **Email:** Attach the file to an email (if it’s small enough).
- **Cloud Storage:** Upload it to Google Drive, Dropbox, or OneDrive and share the link.
- **USB Drive:** Copy it to a USB drive for physical transfer.

---

## Step 4: Import the Backup on the Target Computer
On the target computer, the recipient will:
1. Place the `CarRepairServer.backup` file in an accessible directory (e.g., `C:\Users\TargetUser\Desktop`).
2. Ensure PostgreSQL is installed on their system and `pg_restore` is available.

### Import Command:
The recipient should run:
```bash
pg_restore -U RepairServiceUsers -d CarRepairServer -1 "C:\Users\TargetUser\Desktop\CarRepairServer.backup"
```

If the database doesn’t exist, they should create it first:
```bash
createdb -U RepairServiceUsers CarRepairServer
```

---

## Step 5: Verify the Data on the Target Machine
Log into the database on the target computer and query the tables to ensure everything is restored correctly:
```bash
psql -U RepairServiceUsers -d CarRepairServer
SELECT * FROM some_table;
```


