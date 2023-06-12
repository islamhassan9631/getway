import { Module } from "@nestjs/common";
import { mygatway } from "./gateway";


@Module({
    providers:[mygatway]
})
export class GatewayModule{}