import getConfig from "next/config";

console.log("config", getConfig());
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

export function getRuntimeConfig(){
    return publicRuntimeConfig;
}

export function getServerRuntimeConfig(){
    return serverRuntimeConfig;
}