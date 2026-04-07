import type { MutationCtx, QueryCtx } from "./_generated/server";

export async function verifyAuth(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");

  return identity;
}
