import { Module } from "@nestjs/common";
import { InventoryAuditService } from "./inventory_audits.service";
import { InventoryAuditsController } from "./inventory_audits.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryAudit } from "./inventory_audits.entity";

@Module({
    imports: [TypeOrmModule.forFeature([InventoryAudit])],
    controllers: [InventoryAuditsController],
    providers: [InventoryAuditService],
    exports: [InventoryAuditService],
})
export class InventoryAuditsModule {}

