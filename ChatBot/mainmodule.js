import {GoogleGenerativeAI} from "@google/generative-ai"

const API_KEY = "AIzaSyAbSsLH_t_6tG_zNwwFQjb33ImGC3gIgzo"
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({model: "learnlm-1.5-pro-experimental"
});

export {model};