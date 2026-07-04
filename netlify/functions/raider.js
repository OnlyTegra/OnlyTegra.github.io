export async function handler(event, context) {

  const name = event.queryStringParameters.name;
  const realm = event.queryStringParameters.realm;

  const url =
    `https://raider.io/api/v1/characters/profile` +
    `?region=eu&realm=${realm}&name=${name}` +
    `&fields=gear,mythic_plus_scores_by_season:current,raid_progression` +
    `&access_key=${process.env.RAIDERIOKEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API error" })
    };
  }
}
