import { Grid, Stack, Text } from "@sanity/ui";
import type { CSSProperties } from "react";
import type { StringInputProps } from "sanity";
import {
  COUNTRY_ART_OPTIONS,
  IMPACT_ART_OPTIONS,
} from "../../lib/gm-visual-library";
import {
  CountryFlag,
  CountryMap,
  StatIllustration,
} from "../../app/gm/visuals";

const artStyle = { display: "block", height: 72, width: "100%" } as const;

function optionStyle(selected: boolean): CSSProperties {
  return {
    background: selected ? "#fdf4ed" : "#fff",
    border: `1px solid ${selected ? "#E59A66" : "#d9d9d9"}`,
    borderRadius: 6,
    boxShadow: selected ? "0 0 0 2px rgba(229, 154, 102, 0.24)" : "none",
    display: "block",
    minHeight: 118,
    padding: 10,
  };
}

export function ImpactArtPickerInput(props: StringInputProps) {
  return (
    <Stack space={3}>
      <Grid columns={[1, 2, 3]} gap={2}>
        {IMPACT_ART_OPTIONS.map((option) => {
          const selected = props.value === option.value;

          return (
            <div key={option.value} style={optionStyle(selected)}>
              <Stack space={2}>
                <StatIllustration
                  kind={option.value}
                  label={option.title}
                  style={artStyle}
                />
                <Text
                  align="center"
                  size={1}
                  weight={selected ? "semibold" : "medium"}
                >
                  {option.title}
                </Text>
              </Stack>
            </div>
          );
        })}
      </Grid>
      <Text muted size={1}>
        Select the matching illustration below. Sanity saves this field using
        its standard input.
      </Text>
      {props.renderDefault(props)}
    </Stack>
  );
}

export function CountryArtPickerInput(props: StringInputProps) {
  return (
    <Stack space={3}>
      <Grid columns={[1, 2, 3]} gap={2}>
        {COUNTRY_ART_OPTIONS.map((option) => {
          const selected = props.value === option.value;

          return (
            <div key={option.value} style={optionStyle(selected)}>
              <Stack space={2}>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    gap: 8,
                    height: 72,
                  }}
                >
                  <CountryMap
                    name={option.name}
                    color="#E59A66"
                    style={{
                      height: 64,
                      minWidth: 0,
                      width: "calc(100% - 42px)",
                    }}
                  />
                  <CountryFlag name={option.name} />
                </div>
                <Text
                  align="center"
                  size={1}
                  weight={selected ? "semibold" : "medium"}
                >
                  {option.title}
                </Text>
              </Stack>
            </div>
          );
        })}
      </Grid>
      <Text muted size={1}>
        Select the matching country artwork below. Sanity saves this field
        using its standard input.
      </Text>
      {props.renderDefault(props)}
    </Stack>
  );
}
