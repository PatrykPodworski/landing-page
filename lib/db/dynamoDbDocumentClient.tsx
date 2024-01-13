import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoDbClient = new DynamoDBClient({ region: "eu-north-1" });
const dynamoDbDocumentClient = DynamoDBDocumentClient.from(dynamoDbClient);

export default dynamoDbDocumentClient;
