"use client";

import { setDefaultOptions } from "date-fns";
import { pl } from "date-fns/locale";
import i18next from "i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/pl/zod.json";

setDefaultOptions({
  locale: pl,
});

i18next.init({
  lng: "es",
  resources: {
    es: { zod: translation },
  },
});
z.setErrorMap(zodI18nMap);

export const DateLocale = () => {
  return null;
};
