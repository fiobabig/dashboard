const firebase = require("@firebase/rules-unit-testing");
const fs = require("fs");

module.exports.setup = async (auth, data) =>
{
    const projectId = "fiobabig-dashboard";

    process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
    
    const admin = await firebase.initializeAdminApp({
        projectId,
    });

    const app = await firebase.initializeTestApp({
        projectId,
        auth
    });

    const db = admin.firestore();
    
    if (data)
    {
        for (const key in data)
        {
          const ref = db.doc(key);

          try{
              await ref.set(data[key]);
          }
          catch(err){
            console.log(err, "This is me");
          }
        }
    }

    return app.firestore();
};

module.exports.teardown = async () =>
{
    await Promise.all(firebase.apps().map(a=> a.delete()))
};

expect.extend(
{
    async toAllow(x)
    {
        let pass = false;

        try
        {
            await firebase.assertSucceeds(x);
            pass = true;
        }
        catch (err) {}

        return {
            pass,
            message: () => "Expected Firebase operation to be allowed, but it was denied"
        };
    }
});

expect.extend(
{
    async toDeny(x)
    {
        let pass = false;
        
        try
        {            
            await firebase.assertFails(x);
            pass = true;
        }
        catch (err) { console.log(err) }

        return {
            pass,
            message: () => "Expected Firebase operation to be denied, but it was allowed"
        };
    }
});