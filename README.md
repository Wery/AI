# AI

## Repository Structure

```
/ (root)
|-- frontend/        # React application
|-- backend/         # API service
|-- .github/workflows/ci.yml  # GitHub Actions workflow
```

The `frontend` and `backend` folders contain separate Node.js applications. The `ci.yml` workflow is used to build and test the project automatically.

## Environment Setup

1. **Install Node.js (>= 16)** – Required for both frontend and backend.
2. **Install Azure CLI** – Used to interact with Azure resources such as Azure Active Directory (AAD) and Key Vault.
3. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd AI
   ```

## Build Steps

For each application run `npm install` and `npm run build`:

```bash
# Frontend
cd frontend
npm install
npm run build

# Backend
cd ../backend
npm install
npm run build
```

## Azure AD Registration

1. Sign in with the Azure CLI: `az login`.
2. Create a new AAD application:
   ```bash
   az ad app create --display-name MyApp --reply-urls http://localhost
   ```
3. Note the `appId` and generate a secret:
   ```bash
   az ad app credential reset --id <appId>
   ```
4. Update your `.env` files in `frontend` and `backend` with the client ID and secret.

## Key Vault Usage

Store sensitive values in Azure Key Vault and pull them into your application:

```bash
# Create a vault
az keyvault create --name MyVault --resource-group MyGroup --location eastus

# Add a secret
az keyvault secret set --vault-name MyVault --name MySecret --value "value"

# Retrieve it in your app
az keyvault secret show --vault-name MyVault --name MySecret --query value -o tsv
```

## Running CI/CD Workflows

The repository includes GitHub Actions in `.github/workflows/ci.yml`.

To trigger the workflow locally for testing you can use [`act`](https://github.com/nektos/act):

```bash
act -j build
```

On every push or pull request to `main`, GitHub Actions will run the build job defined in `ci.yml`.

## Local Development

### Frontend

```bash
cd frontend
npm install
npm start       # starts React app on http://localhost:3000
```

### Backend

```bash
cd backend
npm install
npm run dev     # starts API on http://localhost:3001
```

Create `.env` files in each folder for configuration such as AAD credentials or Key Vault secrets. See the example below:

```
CLIENT_ID=<aad-client-id>
CLIENT_SECRET=<aad-client-secret>
KEY_VAULT_NAME=<vault-name>
```

