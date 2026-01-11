module.exports = {
    apps: [
        {
            name: "thespaintoday-admin",
            script: "npm",
            args: "start",
            exec_interpreter: "/home/ubuntu/.nvm/versions/node/v24.12.0/bin/node",
            env: {
                NODE_ENV: "production",
            },
        },
    ],
}
