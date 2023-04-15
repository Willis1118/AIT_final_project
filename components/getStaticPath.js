import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export default function getRuntimeConfig(){
    return publicRuntimeConfig;
}