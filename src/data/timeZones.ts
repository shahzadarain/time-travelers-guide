export const timeZones = [
  {
    continent: "UTC",
    zones: [
      { value: "UTC", label: "UTC (Coordinated Universal Time)", flag: "🌐" }
    ]
  },
  {
    continent: "Africa",
    zones: [
      { value: "Africa/Algiers", label: "Algeria - Algiers", flag: "🇩🇿" },
      { value: "Africa/Cairo", label: "Egypt - Cairo", flag: "🇪🇬" },
      { value: "Africa/Casablanca", label: "Morocco - Casablanca", flag: "🇲🇦" },
      { value: "Africa/Johannesburg", label: "South Africa - Johannesburg", flag: "🇿🇦" },
      { value: "Africa/Lagos", label: "Nigeria - Lagos", flag: "🇳🇬" },
      { value: "Africa/Nairobi", label: "Kenya - Nairobi", flag: "🇰🇪" },
      { value: "Africa/Tunis", label: "Tunisia - Tunis", flag: "🇹🇳" },
      { value: "Africa/Accra", label: "Ghana - Accra", flag: "🇬🇭" },
      { value: "Africa/Addis_Ababa", label: "Ethiopia - Addis Ababa", flag: "🇪🇹" },
      { value: "Africa/Kampala", label: "Uganda - Kampala", flag: "🇺🇬" },
      { value: "Africa/Khartoum", label: "Sudan - Khartoum", flag: "🇸🇩" },
      { value: "Africa/Kinshasa", label: "DR Congo - Kinshasa", flag: "🇨🇩" },
      { value: "Africa/Luanda", label: "Angola - Luanda", flag: "🇦🇴" },
      { value: "Africa/Maputo", label: "Mozambique - Maputo", flag: "🇲🇿" },
      { value: "Africa/Windhoek", label: "Namibia - Windhoek", flag: "🇳🇦" },
      { value: "Africa/Lusaka", label: "Zambia - Lusaka", flag: "🇿🇲" },
      { value: "Africa/Harare", label: "Zimbabwe - Harare", flag: "🇿🇼" }
    ]
  },
  {
    continent: "Americas",
    zones: [
      { value: "America/New_York", label: "United States - New York (EST/EDT)", flag: "🇺🇸" },
      { value: "America/Chicago", label: "United States - Chicago (CST/CDT)", flag: "🇺🇸" },
      { value: "America/Denver", label: "United States - Denver (MST/MDT)", flag: "🇺🇸" },
      { value: "America/Los_Angeles", label: "United States - Los Angeles (PST/PDT)", flag: "🇺🇸" },
      { value: "America/Toronto", label: "Canada - Toronto", flag: "🇨🇦" },
      { value: "America/Vancouver", label: "Canada - Vancouver", flag: "🇨🇦" },
      { value: "America/Edmonton", label: "Canada - Edmonton", flag: "🇨🇦" },
      { value: "America/Winnipeg", label: "Canada - Winnipeg", flag: "🇨🇦" },
      { value: "America/Mexico_City", label: "Mexico - Mexico City", flag: "🇲🇽" },
      { value: "America/Bogota", label: "Colombia - Bogota", flag: "🇨🇴" },
      { value: "America/Lima", label: "Peru - Lima", flag: "🇵🇪" },
      { value: "America/Santiago", label: "Chile - Santiago", flag: "🇨🇱" },
      { value: "America/Sao_Paulo", label: "Brazil - São Paulo", flag: "🇧🇷" },
      { value: "America/Argentina/Buenos_Aires", label: "Argentina - Buenos Aires", flag: "🇦🇷" },
      { value: "America/Caracas", label: "Venezuela - Caracas", flag: "🇻🇪" },
      { value: "America/La_Paz", label: "Bolivia - La Paz", flag: "🇧🇴" },
      { value: "America/Montevideo", label: "Uruguay - Montevideo", flag: "🇺🇾" },
      { value: "America/Asuncion", label: "Paraguay - Asunción", flag: "🇵🇾" },
      { value: "America/Guayaquil", label: "Ecuador - Guayaquil", flag: "🇪🇨" },
      { value: "America/Panama", label: "Panama - Panama City", flag: "🇵🇦" },
      { value: "America/Havana", label: "Cuba - Havana", flag: "🇨🇺" }
    ]
  },
  {
    continent: "Asia",
    zones: [
      { value: "Asia/Tokyo", label: "Japan - Tokyo", flag: "🇯🇵" },
      { value: "Asia/Shanghai", label: "China - Shanghai", flag: "🇨🇳" },
      { value: "Asia/Singapore", label: "Singapore", flag: "🇸🇬" },
      { value: "Asia/Dubai", label: "UAE - Dubai", flag: "🇦🇪" },
      { value: "Asia/Hong_Kong", label: "Hong Kong", flag: "🇭🇰" },
      { value: "Asia/Seoul", label: "South Korea - Seoul", flag: "🇰🇷" },
      { value: "Asia/Kolkata", label: "India - Mumbai/Kolkata", flag: "🇮🇳" },
      { value: "Asia/Bangkok", label: "Thailand - Bangkok", flag: "🇹🇭" },
      { value: "Asia/Jakarta", label: "Indonesia - Jakarta", flag: "🇮🇩" },
      { value: "Asia/Manila", label: "Philippines - Manila", flag: "🇵🇭" },
      { value: "Asia/Kuala_Lumpur", label: "Malaysia - Kuala Lumpur", flag: "🇲🇾" },
      { value: "Asia/Jerusalem", label: "Israel - Jerusalem", flag: "🇮🇱" },
      { value: "Asia/Riyadh", label: "Saudi Arabia - Riyadh", flag: "🇸🇦" },
      { value: "Asia/Istanbul", label: "Turkey - Istanbul", flag: "🇹🇷" },
      { value: "Asia/Taipei", label: "Taiwan - Taipei", flag: "🇹🇼" },
      { value: "Asia/Ho_Chi_Minh", label: "Vietnam - Ho Chi Minh City", flag: "🇻🇳" },
      { value: "Asia/Karachi", label: "Pakistan - Karachi", flag: "🇵🇰" },
      { value: "Asia/Dhaka", label: "Bangladesh - Dhaka", flag: "🇧🇩" },
      { value: "Asia/Colombo", label: "Sri Lanka - Colombo", flag: "🇱🇰" },
      { value: "Asia/Kathmandu", label: "Nepal - Kathmandu", flag: "🇳🇵" },
      { value: "Asia/Kabul", label: "Afghanistan - Kabul", flag: "🇦🇫" },
      { value: "Asia/Tehran", label: "Iran - Tehran", flag: "🇮🇷" },
      { value: "Asia/Baghdad", label: "Iraq - Baghdad", flag: "🇮🇶" },
      { value: "Asia/Muscat", label: "Oman - Muscat", flag: "🇴🇲" },
      { value: "Asia/Baku", label: "Azerbaijan - Baku", flag: "🇦🇿" }
    ]
  },
  {
    continent: "Europe",
    zones: [
      { value: "Europe/London", label: "United Kingdom - London", flag: "🇬🇧" },
      { value: "Europe/Paris", label: "France - Paris", flag: "🇫🇷" },
      { value: "Europe/Berlin", label: "Germany - Berlin", flag: "🇩🇪" },
      { value: "Europe/Rome", label: "Italy - Rome", flag: "🇮🇹" },
      { value: "Europe/Madrid", label: "Spain - Madrid", flag: "🇪🇸" },
      { value: "Europe/Amsterdam", label: "Netherlands - Amsterdam", flag: "🇳🇱" },
      { value: "Europe/Brussels", label: "Belgium - Brussels", flag: "🇧🇪" },
      { value: "Europe/Vienna", label: "Austria - Vienna", flag: "🇦🇹" },
      { value: "Europe/Moscow", label: "Russia - Moscow", flag: "🇷🇺" },
      { value: "Europe/Stockholm", label: "Sweden - Stockholm", flag: "🇸🇪" },
      { value: "Europe/Oslo", label: "Norway - Oslo", flag: "🇳🇴" },
      { value: "Europe/Copenhagen", label: "Denmark - Copenhagen", flag: "🇩🇰" },
      { value: "Europe/Dublin", label: "Ireland - Dublin", flag: "🇮🇪" },
      { value: "Europe/Warsaw", label: "Poland - Warsaw", flag: "🇵🇱" },
      { value: "Europe/Zurich", label: "Switzerland - Zurich", flag: "🇨🇭" },
      { value: "Europe/Athens", label: "Greece - Athens", flag: "🇬🇷" },
      { value: "Europe/Bucharest", label: "Romania - Bucharest", flag: "🇷🇴" },
      { value: "Europe/Helsinki", label: "Finland - Helsinki", flag: "🇫🇮" },
      { value: "Europe/Kyiv", label: "Ukraine - Kyiv", flag: "🇺🇦" },
      { value: "Europe/Lisbon", label: "Portugal - Lisbon", flag: "🇵🇹" },
      { value: "Europe/Prague", label: "Czech Republic - Prague", flag: "🇨🇿" },
      { value: "Europe/Budapest", label: "Hungary - Budapest", flag: "🇭🇺" },
      { value: "Europe/Sofia", label: "Bulgaria - Sofia", flag: "🇧🇬" },
      { value: "Europe/Belgrade", label: "Serbia - Belgrade", flag: "🇷🇸" },
      { value: "Europe/Minsk", label: "Belarus - Minsk", flag: "🇧🇾" }
    ]
  },
  {
    continent: "Oceania",
    zones: [
      { value: "Australia/Sydney", label: "Australia - Sydney", flag: "🇦🇺" },
      { value: "Australia/Melbourne", label: "Australia - Melbourne", flag: "🇦🇺" },
      { value: "Australia/Perth", label: "Australia - Perth", flag: "🇦🇺" },
      { value: "Australia/Brisbane", label: "Australia - Brisbane", flag: "🇦🇺" },
      { value: "Pacific/Auckland", label: "New Zealand - Auckland", flag: "🇳🇿" },
      { value: "Pacific/Fiji", label: "Fiji", flag: "🇫🇯" },
      { value: "Pacific/Port_Moresby", label: "Papua New Guinea - Port Moresby", flag: "🇵🇬" },
      { value: "Pacific/Noumea", label: "New Caledonia - Noumea", flag: "🇳🇨" },
      { value: "Pacific/Guam", label: "Guam", flag: "🇬🇺" },
      { value: "Pacific/Honolulu", label: "Hawaii - Honolulu", flag: "🇺🇸" },
      { value: "Pacific/Apia", label: "Samoa - Apia", flag: "🇼🇸" },
      { value: "Pacific/Tongatapu", label: "Tonga - Tongatapu", flag: "🇹🇴" }
    ]
  }
];