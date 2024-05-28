/*
 * SonarQube
 * Copyright (C) 2009-2024 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

import { FacetBox, FacetItem } from 'design-system';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { Dict } from '../../../types/types';
import { Query, formatFacetStat } from '../utils';
import { FacetItemsList } from './FacetItemsList';

export interface PrioritizedRuleFacetProps {
  fetching: boolean;
  onChange: (changes: Partial<Query>) => void;
  onToggle: (property: string) => void;
  open: boolean;
  value: true | undefined;
  stats: Dict<number> | undefined;
}

export function PrioritizedRuleFacet(props: Readonly<PrioritizedRuleFacetProps>) {
  const { fetching, onToggle, open, value, stats = {} } = props;
  const intl = useIntl();

  const property = 'prioritizedRule';
  const headerId = `facet_${property}`;

  return (
    <FacetBox
      className="it__search-navigator-facet-box it__search-navigator-facet-header"
      clearIconLabel={intl.formatMessage({ id: 'clear' })}
      count={value ? 1 : 0}
      onClear={() => props.onChange({ [property]: undefined })}
      onClick={() => onToggle(property)}
      open={open}
      data-property={property}
      id={headerId}
      loading={fetching}
      name={intl.formatMessage({ id: 'issues.facet.prioritized_rule.category' })}
    >
      <FacetItemsList labelledby={headerId}>
        <FacetItem
          active={value === true}
          name={intl.formatMessage({ id: 'issues.facet.prioritized_rule' })}
          onClick={() => {
            props.onChange({
              [property]: value ? undefined : true,
            });
          }}
          stat={formatFacetStat(stats.true) ?? 0}
          value="true"
        />
      </FacetItemsList>
    </FacetBox>
  );
}
