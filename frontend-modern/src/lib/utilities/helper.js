import { goto } from '$app/navigation';

export function dateFormatter(inputDate) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? "pm" : "am";
    const formattedHour = hour % 12 || 12;
    const formattedMinute = minute < 10 ? "0" + minute : minute;

    const formattedDate = `${month} ${day}, ${year} — ${formattedHour}:${formattedMinute} ${ampm}`;
    return formattedDate;
}

export function addQueryParamsToURL(params) {
    // Check if the 'page' parameter is already present
    if (params.page === 1) {
      // 'page' parameter already exists, redirect to the landing page (base URL)
      window.location.href = window.location.origin; // Redirect to the base URL
      return;
    }
  
    const currentURL = new URL(window.location.href);
  
    // Loop through the 'params' object and append each key-value pair as a query parameter
    for (const key in params) {
      currentURL.searchParams.set(key, params[key]);
    }
  
    // Replace the current URL with the updated one containing the query parameters
    window.history.replaceState({}, '', currentURL);
  
    // Reload the page
    window.location.reload();
  }