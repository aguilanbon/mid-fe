# mid-fe Task Module

## 🚀 Installation Steps

1. **Open Terminal**
   - Navigate to your desired project directory

2. **Clone the Repository**
   ```bash
   git clone https://github.com/aguilanbon/mid-fe.git
   ```

3. **Navigate to Project Directory**
   ```bash
   cd mid-fe
   ```

4. **Open in Visual Studio Code** (Optional)
   ```bash
   code .
   ```

5. **Install Dependencies For Frontend and Backend Folders**
   ```bash
   cd frontend
   npm install
   cd backend
   npm install
   ```
6. **Create env in Backend Folder file to store your PostgreSQL DB settings**

    ```bash
    cd backend

    PORT=3000
    DB_HOST=localhost
    DB_USER=your_username
    DB_PASSWORD=your_password
    DB_NAME=your_db_name
    DB_PORT=5432
    ```

7. **Start Development Server For Frontend and Backend**
   ```bash
   cd backend
   npm run dev
   cd frontend
   npm run dev
   ```

   You should see output similar to:
   ```
   VITE v5.4.9 ready in 3533 ms
   ➜ Local: http://localhost:5173/
   ➜ Network: use --host to expose
   ➜ press h + enter to show help
   ```

8. **Access the Application**
   - Open your browser and navigate to the local URL provided in the terminal (typically http://localhost:5173/)

## ✨ Success!

You should now have the application running locally on your machine.
