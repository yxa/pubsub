var config = module.exports;
config["pub sub jquery"] = {
    environment: "browser",
    sources: [
        "../support/jquery.js",
        "../pubsub.js"
        
    ],
    tests: [
        "pubsub-test.js"
    ]
};