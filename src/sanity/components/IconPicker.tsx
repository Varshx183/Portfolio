"use client";

import { useCallback, useMemo, useState } from "react";
import { set, unset, type StringInputProps } from "sanity";
import { Box, Card, Flex, Grid, Stack, Text, TextInput } from "@sanity/ui";
import { iconKeys, SkillIcon } from "../../components/ui/SkillIcon";

/**
 * Custom CMS input for a skill's icon: a search box over every available icon,
 * shown as a clickable grid of real previews. Click one to select it. Replaces
 * the plain key dropdown so finding the right logo is quick and visual.
 */
export function IconPicker(props: StringInputProps) {
  const { value, onChange } = props;
  const [query, setQuery] = useState("");
  const q = query.toLowerCase().trim();

  const matches = useMemo(
    () => (q ? iconKeys.filter((k) => k.includes(q)) : iconKeys),
    [q]
  );

  const pick = useCallback(
    (key: string) => onChange(key === value ? unset() : set(key)),
    [onChange, value]
  );

  return (
    <Stack space={3}>
      <TextInput
        placeholder="Search icons…  e.g. wireshark, kali, python, shield"
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />

      <Flex align="center" justify="space-between">
        <Text size={1} muted>
          {matches.length} icon{matches.length === 1 ? "" : "s"}
        </Text>
        {value ? (
          <Flex align="center" gap={2}>
            <Text size={1} muted>
              Selected
            </Text>
            <SkillIcon name={value} size={16} />
            <Text size={1} weight="semibold">
              {value}
            </Text>
          </Flex>
        ) : (
          <Text size={1} muted>
            None selected
          </Text>
        )}
      </Flex>

      <Card padding={1} radius={2} shadow={1} style={{ maxHeight: 300, overflowY: "auto" }}>
        {matches.length > 0 ? (
          <Grid columns={[3, 4, 5, 6]} gap={1}>
            {matches.map((key) => (
              <Card
                key={key}
                as="button"
                type="button"
                padding={2}
                radius={2}
                tone={key === value ? "primary" : "default"}
                onClick={() => pick(key)}
                style={{ cursor: "pointer" }}
              >
                <Stack space={2}>
                  <Flex justify="center">
                    <SkillIcon name={key} size={22} />
                  </Flex>
                  <Text align="center" size={0} muted textOverflow="ellipsis">
                    {key}
                  </Text>
                </Stack>
              </Card>
            ))}
          </Grid>
        ) : (
          <Box padding={4}>
            <Text align="center" size={1} muted>
              No icons match “{query}”.
            </Text>
          </Box>
        )}
      </Card>
    </Stack>
  );
}
