"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const aws_sdk_1 = require("aws-sdk");
const DynamoDBRepository_1 = require("./src/infrastructure/repository/DynamoDBRepository");
const SESRepository_1 = require("./src/infrastructure/repository/SESRepository");
const SNSRepository_1 = require("./src/infrastructure/repository/SNSRepository");
const GetUserUseCase_1 = require("./src/application/usecases/GetUserUseCase");
const GetScheduleUseCase_1 = require("./src/application/usecases/GetScheduleUseCase");
const SendEmailUseCase_1 = require("./src/application/usecases/SendEmailUseCase");
const SendSmsUseCase_1 = require("./src/application/usecases/SendSmsUseCase");
exports.handler = async (event = {}) => {
    const dynamoDB = new DynamoDBRepository_1.DynamoDBRepository(new aws_sdk_1.DynamoDB.DocumentClient());
    const ses = new SESRepository_1.SESRepository(new aws_sdk_1.SES());
    const sns = new SNSRepository_1.SNSRepository(new aws_sdk_1.SNS());
    const schedule = await new GetScheduleUseCase_1.GetScheduleUseCase(dynamoDB).execute();
    const user = await new GetUserUseCase_1.GetUserUseCase(schedule, dynamoDB).execute();
    const didSentEmail = await new SendEmailUseCase_1.SendEmailUseCase(user, ses).execute();
    const didSendSms = await new SendSmsUseCase_1.SendSmsUseCase(user, sns).execute();
    return {
        user,
        schedule,
        sentNotifications: {
            email: didSentEmail,
            sms: didSendSms
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBNEM7QUFDNUMsMkZBQXVGO0FBQ3ZGLGlGQUE4RTtBQUM5RSxpRkFBOEU7QUFDOUUsOEVBQTJFO0FBQzNFLHNGQUFtRjtBQUNuRixrRkFBK0U7QUFDL0UsOEVBQTJFO0FBSzlELFFBQUEsT0FBTyxHQUFHLEtBQUssRUFBRSxRQUFhLEVBQUUsRUFBZ0IsRUFBRTtJQUUzRCxNQUFNLFFBQVEsR0FBdUIsSUFBSSx1Q0FBa0IsQ0FBQyxJQUFJLGtCQUFRLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUMzRixNQUFNLEdBQUcsR0FBa0IsSUFBSSw2QkFBYSxDQUFDLElBQUksYUFBRyxFQUFFLENBQUMsQ0FBQztJQUN4RCxNQUFNLEdBQUcsR0FBa0IsSUFBSSw2QkFBYSxDQUFDLElBQUksYUFBRyxFQUFFLENBQUMsQ0FBQztJQUV4RCxNQUFNLFFBQVEsR0FBYSxNQUFNLElBQUksdUNBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUUsTUFBTSxJQUFJLEdBQVMsTUFBTSxJQUFJLCtCQUFjLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRTFFLE1BQU0sWUFBWSxHQUFZLE1BQU0sSUFBSSxtQ0FBZ0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUUsTUFBTSxVQUFVLEdBQVksTUFBTSxJQUFJLCtCQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRTFFLE9BQU87UUFDSCxJQUFJO1FBQ0osUUFBUTtRQUNSLGlCQUFpQixFQUFFO1lBQ2YsS0FBSyxFQUFFLFlBQVk7WUFDbkIsR0FBRyxFQUFFLFVBQVU7U0FDbEI7S0FDSixDQUFBO0FBQ0wsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBTRVMsIFNOUywgRHluYW1vREIgfSBmcm9tICdhd3Mtc2RrJ1xuaW1wb3J0IHsgRHluYW1vREJSZXBvc2l0b3J5IH0gZnJvbSAnLi9zcmMvaW5mcmFzdHJ1Y3R1cmUvcmVwb3NpdG9yeS9EeW5hbW9EQlJlcG9zaXRvcnknXG5pbXBvcnQgeyBTRVNSZXBvc2l0b3J5IH0gZnJvbSAnLi9zcmMvaW5mcmFzdHJ1Y3R1cmUvcmVwb3NpdG9yeS9TRVNSZXBvc2l0b3J5JztcbmltcG9ydCB7IFNOU1JlcG9zaXRvcnkgfSBmcm9tICcuL3NyYy9pbmZyYXN0cnVjdHVyZS9yZXBvc2l0b3J5L1NOU1JlcG9zaXRvcnknO1xuaW1wb3J0IHsgR2V0VXNlclVzZUNhc2UgfSBmcm9tICcuL3NyYy9hcHBsaWNhdGlvbi91c2VjYXNlcy9HZXRVc2VyVXNlQ2FzZSc7XG5pbXBvcnQgeyBHZXRTY2hlZHVsZVVzZUNhc2UgfSBmcm9tICcuL3NyYy9hcHBsaWNhdGlvbi91c2VjYXNlcy9HZXRTY2hlZHVsZVVzZUNhc2UnO1xuaW1wb3J0IHsgU2VuZEVtYWlsVXNlQ2FzZSB9IGZyb20gJy4vc3JjL2FwcGxpY2F0aW9uL3VzZWNhc2VzL1NlbmRFbWFpbFVzZUNhc2UnO1xuaW1wb3J0IHsgU2VuZFNtc1VzZUNhc2UgfSBmcm9tICcuL3NyYy9hcHBsaWNhdGlvbi91c2VjYXNlcy9TZW5kU21zVXNlQ2FzZSc7XG5pbXBvcnQgeyBTY2hlZHVsZSB9IGZyb20gJy4vc3JjL2RvbWFpbi9lbnRpdGllcy9TY2hlZHVsZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi9zcmMvZG9tYWluL2VudGl0aWVzL1VzZXInO1xuXG5cbmV4cG9ydCBjb25zdCBoYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnkgPSB7fSk6IFByb21pc2U8YW55PiA9PiB7XG5cbiAgICBjb25zdCBkeW5hbW9EQjogRHluYW1vREJSZXBvc2l0b3J5ID0gbmV3IER5bmFtb0RCUmVwb3NpdG9yeShuZXcgRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKSk7XG4gICAgY29uc3Qgc2VzOiBTRVNSZXBvc2l0b3J5ID0gbmV3IFNFU1JlcG9zaXRvcnkobmV3IFNFUygpKTtcbiAgICBjb25zdCBzbnM6IFNOU1JlcG9zaXRvcnkgPSBuZXcgU05TUmVwb3NpdG9yeShuZXcgU05TKCkpO1xuXG4gICAgY29uc3Qgc2NoZWR1bGU6IFNjaGVkdWxlID0gYXdhaXQgbmV3IEdldFNjaGVkdWxlVXNlQ2FzZShkeW5hbW9EQikuZXhlY3V0ZSgpO1xuICAgIGNvbnN0IHVzZXI6IFVzZXIgPSBhd2FpdCBuZXcgR2V0VXNlclVzZUNhc2Uoc2NoZWR1bGUsIGR5bmFtb0RCKS5leGVjdXRlKCk7XG5cbiAgICBjb25zdCBkaWRTZW50RW1haWw6IGJvb2xlYW4gPSBhd2FpdCBuZXcgU2VuZEVtYWlsVXNlQ2FzZSh1c2VyLCBzZXMpLmV4ZWN1dGUoKTtcbiAgICBjb25zdCBkaWRTZW5kU21zOiBib29sZWFuID0gYXdhaXQgbmV3IFNlbmRTbXNVc2VDYXNlKHVzZXIsIHNucykuZXhlY3V0ZSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdXNlcixcbiAgICAgICAgc2NoZWR1bGUsXG4gICAgICAgIHNlbnROb3RpZmljYXRpb25zOiB7XG4gICAgICAgICAgICBlbWFpbDogZGlkU2VudEVtYWlsLFxuICAgICAgICAgICAgc21zOiBkaWRTZW5kU21zXG4gICAgICAgIH1cbiAgICB9XG59Il19