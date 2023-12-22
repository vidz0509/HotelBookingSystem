import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { VerificationCode } from './schema/verificationCode.schema';
import { VerificationCodesCollection } from './schema/verificationCode.collection';
import { CreateCodeDto } from './dto/create.dto';
import { HelpersServices } from '../services/helpers/helpers.services';


@Injectable()
export class VerificationCodesService {

    private readonly logger = new Logger(VerificationCodesService.name);

    constructor(
        private readonly collection: VerificationCodesCollection,
        private readonly helper: HelpersServices
    ) { }

    async generateCode(userId: string) {
        const verificationCode = await this.helper.generateVerificationCode();
        const createCodeDto: CreateCodeDto = {
            userId: userId,
            verificationCode: verificationCode,
            generationTime: new Date,
        }
        try {
            const codeDocument = await this.collection.generateCode(createCodeDto);
            return codeDocument.verificationCode;
        } catch (error) {
            if (error) {
                console.error(`Failed to upsert user cases into MongoDB: ${error}`);
                console.error(JSON.stringify(error, null, 2));
                throw new InternalServerErrorException(await this.helper.buildResponse(false, 'Something went wrong.'));
            }
        }
    }

    async getCode(userId: string) {
        return await this.collection.getCode(userId);
    }

}
