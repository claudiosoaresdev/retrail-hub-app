import { Platform } from "react-native";
import { Registry } from "miragejs";
import Schema from "miragejs/orm/schema";

import { models } from "./mirageModels";
import { factories } from "./mirageFactories";

export const LOCAL_IP = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

type AppRegistry = Registry<typeof models, typeof factories>
export type AppSchema = Schema<AppRegistry> 