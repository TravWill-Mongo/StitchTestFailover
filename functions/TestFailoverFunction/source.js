// Author: Ronan Bohan
// Date: 04/15/2020

exports = function(){
  const project = context.values.get(`failover-project`);   // project id
  const username = context.values.get(`failover-username`); // API public key
  const password = context.values.get(`failover-password`); // API private key
  const clusters = context.values.get(`failover-clusters`); // list of clusters to target

  let fns = [];
  clusters.forEach(function(cluster) {
    fns.push(failover(username, password, project, cluster)
              .then(response => { console.log(`- cluster '${cluster}': ` + response.body.text())})
              .catch(err => { console.error(`- cluster '${cluster}': ` + err.message.text())})
    );
  });
  return Promise.all(fns)
    .then(() => { return { result: "success" }})
    .catch(() => { return { result: "failure" }});
};

failover = function(username, password, project, cluster) {
  const arg = { 
    "scheme": `https`, 
    "host": `cloud.mongodb.com`, 
    "path": `api/atlas/v1.0/groups/${project}/clusters/${cluster}/restartPrimaries`, 
    "username": username, 
    "password": password,
    "headers": { "Content-Type": ["application/json"], "Accept-Encoding": ["bzip, deflate"] }, 
    "digestAuth": true,
    "body": JSON.stringify({})
  };
  
  return context.http.post(arg);
};
