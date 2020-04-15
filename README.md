# StitchTestFailover
This will create a new Stitch App called "TestFailover-PoV" with the purpose of running the "Test Failover" function on predefined clusters. The core of this Stitch App is made up of just 1 Webhook function and 4 values that will need to be updated for your project.

### Prequisites:
- Existing Atlas Project
    - M10+ Cluster (The cluster that will be managed by the process)
- Atlas Information Required:
    - Project ID
    - Public and Private API Keys (w/ "Project Owner" permissions)
- Stitch CLI: https://docs.mongodb.com/stitch/deploy/stitch-cli-reference/#installation

### Known Limitations:
- The following scenarios are when a cluster cannot run the test failover:
    - Cluster is a shared Tier (M0, M2, or M5)


### Installation:
This process should take roughly 15 minutes to complete.

1. Download this repo, uncompress, and CD to repo folder
```sh
git clone https://github.com/TravWill-Mongo/StitchTestFailover.git
cd ./StitchTestFailover
```
2. From your Terminal, Perform the following steps:
```sh
# 1. Login to Stitch CLI
stitch-cli login --api-key=my-api-key --private-api-key=my-private-api-key

# 2. Run the initial Import of the Stitch App
# Notes: 
#    An error is expected due to the lack of existing Secrets.
#    The first import will create an empty Stitch App for us to create the secrets on.
stitch-cli import --project-id=ProjectID

# 3. Create the initial Secrets for the Public and Private API Keys
# Note: 
#    These can be updated from the Atlas UI Later. We just need the secrets to exist for the import to succeed.
stitch-cli secrets add --name=ApiPrivateKey --value=SuperSecretValue!

# 4. Re-Import the Stitch App, now that the secrets exist
stitch-cli import --project-id=ProjectID --strategy=replace
```
3. From the Stitch App, Navigate to "Values & Secrets"
    - Under the "Values" Tab, you will need to update the following:
        - failover-project: This value was previously used on the import command.
        - failover-clusters: This is an Array of strings, that identify the name of the clusters in your project. Multiple clusters can be added as needed.
        - failover-username: This will be your API Public Key
    - Under the "Secrets" Tab, you will need to update the following:
        - failover-password: This will be your API Private Key

4. Review and Deploy Changes
5. Find the webhook url, and test with curl
```sh
curl https://.....
```

### Special Thanks:
- [@rbohan](https://github.com/rbohan) for the code provided in this repo

### Disclaimer:
This stitch app is not battle tested, nor regularly maintained, and does not include a warranty! Feel free to update and contribute as needed!
