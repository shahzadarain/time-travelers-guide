export const timeZones = [
  {
    continent: "UTC",
    zones: [
      { value: "UTC", label: "UTC (Coordinated Universal Time)", flag: "🌐" }
    ]
  },
  {
    continent: "Americas",
    zones: [
      { value: "America/New_York", label: "United States - New York (EST/EDT)", flag: "🇺🇸" },
      { value: "America/Chicago", label: "United States - Chicago (CST/CDT)", flag: "🇺🇸" },
      { value: "America/Denver", label: "United States - Denver (MST/MDT)", flag: "🇺🇸" },
      { value: "America/Los_Angeles", label: "United States - Los Angeles (PST/PDT)", flag: "🇺🇸" },
      { value: "America/Toronto", label: "Canada - Toronto (EST/EDT)", flag: "🇨🇦" },
      { value: "America/Vancouver", label: "Canada - Vancouver (PST/PDT)", flag: "🇨🇦" },
      { value: "America/Mexico_City", label: "Mexico - Mexico City (CST/CDT)", flag: "🇲🇽" },
      { value: "America/Bogota", label: "Colombia - Bogota (COT)", flag: "🇨🇴" },
      { value: "America/Lima", label: "Peru - Lima (PET)", flag: "🇵🇪" },
      { value: "America/Santiago", label: "Chile - Santiago (CLT/CLST)", flag: "🇨🇱" },
      { value: "America/Sao_Paulo", label: "Brazil - São Paulo (BRT)", flag: "🇧🇷" },
      { value: "America/Buenos_Aires", label: "Argentina - Buenos Aires (ART)", flag: "🇦🇷" },
      { value: "America/Caracas", label: "Venezuela - Caracas (VET)", flag: "🇻🇪" },
      { value: "America/La_Paz", label: "Bolivia - La Paz (BOT)", flag: "🇧🇴" },
      { value: "America/Montevideo", label: "Uruguay - Montevideo (UYT)", flag: "🇺🇾" },
      { value: "America/Asuncion", label: "Paraguay - Asunción (PYT/PYST)", flag: "🇵🇾" },
      { value: "America/Guayaquil", label: "Ecuador - Guayaquil (ECT)", flag: "🇪🇨" }
    ]
  },
  {
    continent: "Europe",
    zones: [
      { value: "Europe/London", label: "United Kingdom - London (GMT/BST)", flag: "🇬🇧" },
      { value: "Europe/Paris", label: "France - Paris (CET/CEST)", flag: "🇫🇷" },
      { value: "Europe/Berlin", label: "Germany - Berlin (CET/CEST)", flag: "🇩🇪" },
      { value: "Europe/Rome", label: "Italy - Rome (CET/CEST)", flag: "🇮🇹" },
      { value: "Europe/Madrid", label: "Spain - Madrid (CET/CEST)", flag: "🇪🇸" },
      { value: "Europe/Amsterdam", label: "Netherlands - Amsterdam (CET/CEST)", flag: "🇳🇱" },
      { value: "Europe/Brussels", label: "Belgium - Brussels (CET/CEST)", flag: "🇧🇪" },
      { value: "Europe/Vienna", label: "Austria - Vienna (CET/CEST)", flag: "🇦🇹" },
      { value: "Europe/Moscow", label: "Russia - Moscow (MSK)", flag: "🇷🇺" },
      { value: "Europe/Stockholm", label: "Sweden - Stockholm (CET/CEST)", flag: "🇸🇪" },
      { value: "Europe/Oslo", label: "Norway - Oslo (CET/CEST)", flag: "🇳🇴" },
      { value: "Europe/Copenhagen", label: "Denmark - Copenhagen (CET/CEST)", flag: "🇩🇰" },
      { value: "Europe/Dublin", label: "Ireland - Dublin (GMT/IST)", flag: "🇮🇪" },
      { value: "Europe/Warsaw", label: "Poland - Warsaw (CET/CEST)", flag: "🇵🇱" },
      { value: "Europe/Zurich", label: "Switzerland - Zurich (CET/CEST)", flag: "🇨🇭" },
      { value: "Europe/Athens", label: "Greece - Athens (EET/EEST)", flag: "🇬🇷" },
      { value: "Europe/Bucharest", label: "Romania - Bucharest (EET/EEST)", flag: "🇷🇴" },
      { value: "Europe/Helsinki", label: "Finland - Helsinki (EET/EEST)", flag: "🇫🇮" },
      { value: "Europe/Kiev", label: "Ukraine - Kiev (EET/EEST)", flag: "🇺🇦" },
      { value: "Europe/Lisbon", label: "Portugal - Lisbon (WET/WEST)", flag: "🇵🇹" }
    ]
  },
  {
    continent: "Asia",
    zones: [
      { value: "Asia/Tokyo", label: "Japan - Tokyo (JST)", flag: "🇯🇵" },
      { value: "Asia/Shanghai", label: "China - Shanghai (CST)", flag: "🇨🇳" },
      { value: "Asia/Singapore", label: "Singapore (SGT)", flag: "🇸🇬" },
      { value: "Asia/Dubai", label: "UAE - Dubai (GST)", flag: "🇦🇪" },
      { value: "Asia/Hong_Kong", label: "Hong Kong (HKT)", flag: "🇭🇰" },
      { value: "Asia/Seoul", label: "South Korea - Seoul (KST)", flag: "🇰🇷" },
      { value: "Asia/Kolkata", label: "India - Mumbai/Kolkata (IST)", flag: "🇮🇳" },
      { value: "Asia/Bangkok", label: "Thailand - Bangkok (ICT)", flag: "🇹🇭" },
      { value: "Asia/Jakarta", label: "Indonesia - Jakarta (WIB)", flag: "🇮🇩" },
      { value: "Asia/Manila", label: "Philippines - Manila (PHT)", flag: "🇵🇭" },
      { value: "Asia/Kuala_Lumpur", label: "Malaysia - Kuala Lumpur (MYT)", flag: "🇲🇾" },
      { value: "Asia/Tel_Aviv", label: "Israel - Tel Aviv (IST)", flag: "🇮🇱" },
      { value: "Asia/Riyadh", label: "Saudi Arabia - Riyadh (AST)", flag: "🇸🇦" },
      { value: "Asia/Istanbul", label: "Turkey - Istanbul (TRT)", flag: "🇹🇷" },
      { value: "Asia/Taipei", label: "Taiwan - Taipei (CST)", flag: "🇹🇼" },
      { value: "Asia/Ho_Chi_Minh", label: "Vietnam - Ho Chi Minh City (ICT)", flag: "🇻🇳" },
      { value: "Asia/Karachi", label: "Pakistan - Karachi (PKT)", flag: "🇵🇰" },
      { value: "Asia/Dhaka", label: "Bangladesh - Dhaka (BST)", flag: "🇧🇩" },
      { value: "Asia/Colombo", label: "Sri Lanka - Colombo (IST)", flag: "🇱🇰" },
      { value: "Asia/Kathmandu", label: "Nepal - Kathmandu (NPT)", flag: "🇳🇵" }
    ]
  },
  {
    continent: "Oceania",
    zones: [
      { value: "Australia/Sydney", label: "Australia - Sydney (AEST/AEDT)", flag: "🇦🇺" },
      { value: "Australia/Melbourne", label: "Australia - Melbourne (AEST/AEDT)", flag: "🇦🇺" },
      { value: "Australia/Perth", label: "Australia - Perth (AWST)", flag: "🇦🇺" },
      { value: "Australia/Brisbane", label: "Australia - Brisbane (AEST)", flag: "🇦🇺" },
      { value: "Pacific/Auckland", label: "New Zealand - Auckland (NZST/NZDT)", flag: "🇳🇿" },
      { value: "Pacific/Fiji", label: "Fiji (FJT)", flag: "🇫🇯" },
      { value: "Pacific/Port_Moresby", label: "Papua New Guinea (PGT)", flag: "🇵🇬" },
      { value: "Pacific/Noumea", label: "New Caledonia (NCT)", flag: "🇳🇨" },
      { value: "Pacific/Guam", label: "Guam (ChST)", flag: "🇬🇺" },
      { value: "Pacific/Honolulu", label: "Hawaii (HST)", flag: "🇺🇸" }
    ]
  },
  {
    continent: "Africa",
    zones: [
      { value: "Africa/Cairo", label: "Egypt - Cairo (EET)", flag: "🇪🇬" },
      { value: "Africa/Johannesburg", label: "South Africa - Johannesburg (SAST)", flag: "🇿🇦" },
      { value: "Africa/Lagos", label: "Nigeria - Lagos (WAT)", flag: "🇳🇬" },
      { value: "Africa/Nairobi", label: "Kenya - Nairobi (EAT)", flag: "🇰🇪" },
      { value: "Africa/Casablanca", label: "Morocco - Casablanca (WET/WEST)", flag: "🇲🇦" },
      { value: "Africa/Accra", label: "Ghana - Accra (GMT)", flag: "🇬🇭" },
      { value: "Africa/Addis_Ababa", label: "Ethiopia - Addis Ababa (EAT)", flag: "🇪🇹" },
      { value: "Africa/Dar_es_Salaam", label: "Tanzania - Dar es Salaam (EAT)", flag: "🇹🇿" },
      { value: "Africa/Khartoum", label: "Sudan - Khartoum (CAT)", flag: "🇸🇩" },
      { value: "Africa/Algiers", label: "Algeria - Algiers (CET)", flag: "🇩🇿" },
      { value: "Africa/Tunis", label: "Tunisia - Tunis (CET)", flag: "🇹🇳" },
      { value: "Africa/Kampala", label: "Uganda - Kampala (EAT)", flag: "🇺🇬" },
      { value: "Africa/Lusaka", label: "Zambia - Lusaka (CAT)", flag: "🇿🇲" },
      { value: "Africa/Maputo", label: "Mozambique - Maputo (CAT)", flag: "🇲🇿" },
      { value: "Africa/Windhoek", label: "Namibia - Windhoek (CAT/WAT)", flag: "🇳🇦" }
    ]
  }
];