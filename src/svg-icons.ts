export const SVG_ICONS: Record<string, string> = {
  gitHub: `<svg
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-github"
          >
            <title>GitHub</title>
            <path
              d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
            ></path>
          </svg>
            `,
  arrowRight: `<svg width="39" height="13" viewBox="0 0 39 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.5 6.04307H38M38 6.04307C38 6.04307 33.5119 3.09149 32.6 0.643066M38 6.04307C38 6.04307 34.0324 8.81644 32.6 11.4431" stroke="#754E3D" stroke-linecap="square"/>
              </svg>
              `,
  yellowArrowRight: `<svg width="39" height="13" viewBox="0 0 39 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.5 6.04307H38M38 6.04307C38 6.04307 33.5119 3.09149 32.6 0.643066M38 6.04307C38 6.04307 34.0324 8.81644 32.6 11.4431" stroke="#E58411" stroke-linecap="square"/>
              </svg>
              `,
} as const;

export type SvgIconName = keyof typeof SVG_ICONS;
