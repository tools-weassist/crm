import type { Prisma } from "@crm/db";
import { parse, schemas } from "@crm/validation";
import { readBrand } from "@crm/validation/brand";
import { joinSlackChannel } from "./slack-membership";

export async function runSlackChannelJoin(
	value: Prisma.JsonValue,
): Promise<string> {
	const { channelId, channelName } = parse(
		schemas.slack.joinPayload,
		value,
		"A slack-channel-join task carries an unreadable payload",
	);
	const outcome = await joinSlackChannel(channelId);
	const { name } = readBrand();

	if (outcome.joined) {
		return outcome.already
			? `${name} was already in #${channelName}.`
			: `${name} joined #${channelName}.`;
	}

	return `${name} could not join #${channelName}. ${outcome.reason}`;
}
