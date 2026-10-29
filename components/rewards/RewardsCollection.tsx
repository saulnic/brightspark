import { Avatar } from "@/components/avatar/Avatar";
import type { AvatarConfig } from "@/content/avatar";
import { isEquipped, REWARDS } from "@/content/rewards";
import { equipReward } from "@/app/learn/[learnerId]/rewards/actions";

export function RewardsCollection({
  learnerId,
  learnerName,
  avatar,
  stars,
}: {
  learnerId:string;
  learnerName:string;
  avatar:AvatarConfig;
  stars:number;
}) {
  return (
    <>
      <section className="rewardsHero">
        <Avatar config={avatar} size={104} />
        <div>
          <p className="eyebrow">Your collection</p>
          <h1>{learnerName}&apos;s rewards</h1>
          <p className="muted">Earn stars by learning, then choose what to wear or who comes with you.</p>
          <div className="rewardStars">⭐ {stars} stars</div>
        </div>
      </section>

      <div className="rewardGrid">
        {REWARDS.map((reward) => {
          const unlocked = stars >= reward.stars;
          const equipped = unlocked && isEquipped(avatar, reward);
          const needsPet = reward.category === "pet_accessory" && avatar.pet === "none";
          return (
            <article className={unlocked ? "rewardCard" : "rewardCard locked"} key={reward.id}>
              <div className="rewardIcon">{unlocked ? reward.icon : "🔒"}</div>
              <div className="rewardCopy">
                <strong>{reward.name}</strong>
                <span>{reward.description}</span>
                <small>{unlocked ? "Unlocked" : `Unlocks at ${reward.stars} stars`}</small>
              </div>
              {unlocked ? (
                <form action={equipReward}>
                  <input type="hidden" name="learnerId" value={learnerId} />
                  <input type="hidden" name="rewardId" value={reward.id} />
                  <button className={equipped ? "rewardButton equipped" : "rewardButton"} disabled={equipped || needsPet}>
                    {equipped ? "Equipped" : needsPet ? "Choose a pet first" : "Equip"}
                  </button>
                </form>
              ) : null}
            </article>
          );
        })}
      </div>
    </>
  );
}
