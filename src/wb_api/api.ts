import env from "#config/env/env.js";

export async function get_coeffs(daysAgo: number) {
    let day = new Date();
    day.setDate(day.getDate() - daysAgo);
    let dayStr = day.toISOString().split("T")[0]
    const url = `https://common-api.wildberries.ru/api/v1/tariffs/box?date=${dayStr}`;
    const options = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${env.API_KEY}`,
        },
    };

    const response = await fetch(url, options);
    return await response.json();
}
