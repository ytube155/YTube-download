
export async function onRequest(context) {
  const url = new URL(context.request.url);
  const videoUrl = url.searchParams.get("url");

  if (!videoUrl) {
    return Response.json({
      success: false,
      message: "YouTube link is missing"
    }, { status: 400 });
  }

  try {
    const video = new URL(videoUrl);

    const allowedHosts = [
      "youtube.com",
      "www.youtube.com",
      "m.youtube.com",
      "youtu.be"
    ];

    if (
      video.protocol !== "https:" ||
      !allowedHosts.includes(video.hostname)
    ) {
      throw new Error("Invalid YouTube link");
    }

    const apiUrl =
      "https://www.youtube.com/oembed?url=" +
      encodeURIComponent(videoUrl) +
      "&format=json";

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Video not found");
    }

    const data = await response.json();

    return Response.json({
      success: true,
      title: data.title,
      thumbnail: data.thumbnail_url,
      author: data.author_name
    });

  } catch {
    return Response.json({
      success: false,
      message: "Unable to fetch YouTube video information"
    }, { status: 400 });
  }
}
