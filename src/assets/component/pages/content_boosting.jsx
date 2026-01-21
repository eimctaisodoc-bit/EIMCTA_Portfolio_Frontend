import React, { useEffect, useState, useMemo } from "react";
import { api } from "../utilities/SocialMedia/AllApi";

const ContentBoosting = () => {
  const [loading, setLoading] = useState(true);
  const [contents, setContents] = useState([]);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // ===========================
  // Parallel API Fetch
  // ===========================
  api.get("/facebook/page-content").then(res => {
    console.log(res.data);
  }).catch(err => { console.log(err) });
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        const [
          fbRes,
          tiktokRes,
          ytRes,
          linkedinRes,
        ] = await Promise.allSettled([
          // api.get("/tiktok/video"),
          // api.get("/youtube/videos"),
          // api.get("/linkedin/posts"),
        ]);

        const normalize = [];
        // ================= FB =================
        if (fbRes.status === "fulfilled") {
          fbRes.value.data?.data?.forEach((post) => {
            normalize.push({
              platform: "Facebook",
              date: post.created_time,
              text:
                post.story
                  ? post.story
                  : post.message
                    ? post.message
                    : "",
              image:
                post.attachments?.data?.[0]?.media?.image?.src || null,
              video: post.attachments?.data?.[0]?.media?.source || null,
            });
          });
        }

        // ================= TikTok =================
        if (tiktokRes.status === "fulfilled") {
          tiktokRes.value.data?.data?.forEach((video) => {
            normalize.push({
              platform: "TikTok",
              date: video.create_time,
              text: video.title || video.description || "",
              image: video.cover_image_url || null,
              video: video.video_url || null,
            });
          });
        }

        // ================= YouTube =================
        if (ytRes.status === "fulfilled") {
          ytRes.value.data?.items?.forEach((v) => {
            normalize.push({
              platform: "YouTube",
              date: v.snippet?.publishedAt,
              text: v.snippet?.title,
              image: v.snippet?.thumbnails?.high?.url,
              video: `https://www.youtube.com/watch?v=${v.id?.videoId}`,
            });
          });
        }

        // ================= LinkedIn =================
        if (linkedinRes.status === "fulfilled") {
          linkedinRes.value.data?.data?.forEach((post) => {
            normalize.push({
              platform: "LinkedIn",
              date: post.created_at,
              text: post.text || "",
              image: post.image_url || null,
              video: post.video_url || null,
            });
          });
        }

        setContents(normalize);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // ===========================
  // Search + Date Filter
  // ===========================
  const filteredData = useMemo(() => {
    return contents.filter((item) => {
      const matchText = item.text
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const itemDate = new Date(item.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      const matchDate =
        (!from || itemDate >= from) &&
        (!to || itemDate <= to);

      return matchText && matchDate;
    });
  }, [contents, search, fromDate, toDate]);

  // ===========================
  // Loader
  // ===========================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-yellow-300 rounded-full animate-spin"></div>
      </div>
    );
  }

  // ===========================
  // UI
  // ===========================
  return (
    <div className="p-6 space-y-6">

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search content..."
          className="border p-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden border"
          >
            {/* Image / Video */}
            {item.image && (
              <img
                src={item.image}
                alt="media"
                className="w-full h-48 object-cover"
              />
            )}

            {!item.image && item.video && (
              <video
                src={item.video}
                controls
                className="w-full h-48 object-cover"
              />
            )}

            {/* Content */}
            <div className="p-4 space-y-2">
              <span className="text-xs px-2 py-1 rounded bg-amber-100 text-amber-700">
                {item.platform}
              </span>
              <p className="text-sm text-gray-700 line-clamp-3">
                {item.text || "No description available"}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(item.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty */}
      {!filteredData.length && (
        <p className="text-center text-gray-500">
          No content found
        </p>
      )}
    </div>
  );
};

export default ContentBoosting;
