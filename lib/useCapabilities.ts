'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import committedFallback from '@/data/capabilities.json'
import { downloadJSON } from './export'
import type {
  CapabilitiesData,
  Capability,
  ChannelKey,
  ChannelSupport,
  DiffSummaryStats,
} from './types'
import { CHANNEL_KEYS } from './types'

const STORAGE_KEY = 'fynd-payments-capabilities'

function cloneData(data: CapabilitiesData): CapabilitiesData {
  return JSON.parse(JSON.stringify(data)) as CapabilitiesData
}

function sameJSON(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right)
}

function flattenCapabilities(data: CapabilitiesData) {
  const map = new Map<
    string,
    { categoryId: string; index: number; capability: Capability }
  >()

  data.categories.forEach((category) => {
    category.capabilities.forEach((capability, index) => {
      map.set(capability.id, { categoryId: category.id, index, capability })
    })
  })

  return map
}

function computeDiffSummary(
  current: CapabilitiesData,
  committed: CapabilitiesData,
): DiffSummaryStats {
  let categoryChanges = 0
  let capabilityChanges = 0
  let statusChanges = 0

  const currentCategoryIds = current.categories.map((category) => category.id)
  const committedCategoryIds = committed.categories.map((category) => category.id)
  if (!sameJSON(currentCategoryIds, committedCategoryIds)) categoryChanges += 1

  const committedCategories = new Map(
    committed.categories.map((category) => [category.id, category]),
  )

  current.categories.forEach((category) => {
    const committedCategory = committedCategories.get(category.id)
    if (!committedCategory) {
      categoryChanges += 1
      capabilityChanges += category.capabilities.length
      statusChanges += category.capabilities.length * CHANNEL_KEYS.length
      return
    }

    const categoryShape = {
      name: category.name,
      description: category.description,
      showOnMerchantView: category.showOnMerchantView,
    }
    const committedCategoryShape = {
      name: committedCategory.name,
      description: committedCategory.description,
      showOnMerchantView: committedCategory.showOnMerchantView,
    }

    if (!sameJSON(categoryShape, committedCategoryShape)) {
      categoryChanges += 1
    }
  })

  committed.categories.forEach((category) => {
    if (!current.categories.some((currentCategory) => currentCategory.id === category.id)) {
      categoryChanges += 1
      capabilityChanges += category.capabilities.length
      statusChanges += category.capabilities.length * CHANNEL_KEYS.length
    }
  })

  const currentCapabilities = flattenCapabilities(current)
  const committedCapabilities = flattenCapabilities(committed)

  currentCapabilities.forEach((currentEntry, id) => {
    const committedEntry = committedCapabilities.get(id)
    if (!committedEntry) {
      capabilityChanges += 1
      statusChanges += CHANNEL_KEYS.length
      return
    }

    const currentCapabilityShape = {
      categoryId: currentEntry.categoryId,
      index: currentEntry.index,
      name: currentEntry.capability.name,
      description: currentEntry.capability.description,
      icon: currentEntry.capability.icon,
      showOnMerchantView: currentEntry.capability.showOnMerchantView,
      internalOnly: currentEntry.capability.internalOnly ?? false,
    }
    const committedCapabilityShape = {
      categoryId: committedEntry.categoryId,
      index: committedEntry.index,
      name: committedEntry.capability.name,
      description: committedEntry.capability.description,
      icon: committedEntry.capability.icon,
      showOnMerchantView: committedEntry.capability.showOnMerchantView,
      internalOnly: committedEntry.capability.internalOnly ?? false,
    }

    if (!sameJSON(currentCapabilityShape, committedCapabilityShape)) {
      capabilityChanges += 1
    }

    CHANNEL_KEYS.forEach((channel) => {
      if (
        !sameJSON(
          currentEntry.capability.channels[channel],
          committedEntry.capability.channels[channel],
        )
      ) {
        statusChanges += 1
      }
    })
  })

  committedCapabilities.forEach((_committedEntry, id) => {
    if (!currentCapabilities.has(id)) {
      capabilityChanges += 1
      statusChanges += CHANNEL_KEYS.length
    }
  })

  return {
    total: categoryChanges + capabilityChanges + statusChanges,
    categoryChanges,
    capabilityChanges,
    statusChanges,
  }
}

export function useCapabilities() {
  const [committed, setCommitted] = useState<CapabilitiesData>(() =>
    cloneData(committedFallback as CapabilitiesData),
  )
  const [data, setData] = useState<CapabilitiesData>(() =>
    cloneData(committedFallback as CapabilitiesData),
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function loadCapabilities() {
      try {
        const response = await fetch('/api/capabilities', { cache: 'no-store' })
        if (!response.ok) throw new Error('Unable to fetch capabilities')
        const fetched = (await response.json()) as CapabilitiesData
        if (!active) return

        setCommitted(cloneData(fetched))

        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          try {
            setData(JSON.parse(stored) as CapabilitiesData)
          } catch {
            localStorage.removeItem(STORAGE_KEY)
            setData(cloneData(fetched))
          }
        } else {
          setData(cloneData(fetched))
        }
      } catch (loadError) {
        if (!active) return
        const fallback = cloneData(committedFallback as CapabilitiesData)
        setCommitted(fallback)
        setData(() => {
          const stored = localStorage.getItem(STORAGE_KEY)
          if (!stored) return cloneData(fallback)
          try {
            return JSON.parse(stored) as CapabilitiesData
          } catch {
            localStorage.removeItem(STORAGE_KEY)
            return cloneData(fallback)
          }
        })
        setError(loadError instanceof Error ? loadError.message : 'Unable to load data')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadCapabilities()

    return () => {
      active = false
    }
  }, [])

  const saveData = useCallback((nextData: CapabilitiesData) => {
    setData(nextData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData))
  }, [])

  const updateCategory = useCallback(
    (
      categoryId: string,
      patch: Partial<Pick<CapabilitiesData['categories'][number], 'name' | 'description' | 'showOnMerchantView'>>,
    ) => {
      const next = cloneData(data)
      const category = next.categories.find((item) => item.id === categoryId)
      if (!category) return
      Object.assign(category, patch)
      saveData(next)
    },
    [data, saveData],
  )

  const updateCapability = useCallback(
    (
      categoryId: string,
      capabilityId: string,
      patch: Partial<
        Pick<
          Capability,
          | 'name'
          | 'description'
          | 'icon'
          | 'showOnMerchantView'
          | 'internalOnly'
        >
      >,
    ) => {
      const next = cloneData(data)
      const capability = next.categories
        .find((category) => category.id === categoryId)
        ?.capabilities.find((item) => item.id === capabilityId)
      if (!capability) return
      Object.assign(capability, patch)
      saveData(next)
    },
    [data, saveData],
  )

  const updateChannelSupport = useCallback(
    (
      categoryId: string,
      capabilityId: string,
      channel: ChannelKey,
      support: ChannelSupport,
    ) => {
      const next = cloneData(data)
      const capability = next.categories
        .find((category) => category.id === categoryId)
        ?.capabilities.find((item) => item.id === capabilityId)
      if (!capability) return
      capability.channels[channel] = support
      saveData(next)
    },
    [data, saveData],
  )

  const addCapability = useCallback(
    (categoryId: string, capability: Capability) => {
      const next = cloneData(data)
      const category = next.categories.find((item) => item.id === categoryId)
      if (!category) return
      category.capabilities.push(capability)
      saveData(next)
    },
    [data, saveData],
  )

  const removeCapability = useCallback(
    (categoryId: string, capabilityId: string) => {
      const next = cloneData(data)
      const category = next.categories.find((item) => item.id === categoryId)
      if (!category) return
      category.capabilities = category.capabilities.filter(
        (capability) => capability.id !== capabilityId,
      )
      saveData(next)
    },
    [data, saveData],
  )

  const reorderCapability = useCallback(
    (categoryId: string, activeId: string, overId: string) => {
      if (activeId === overId) return
      const next = cloneData(data)
      const category = next.categories.find((item) => item.id === categoryId)
      if (!category) return

      const oldIndex = category.capabilities.findIndex(
        (capability) => capability.id === activeId,
      )
      const newIndex = category.capabilities.findIndex(
        (capability) => capability.id === overId,
      )
      if (oldIndex < 0 || newIndex < 0) return

      const [moved] = category.capabilities.splice(oldIndex, 1)
      category.capabilities.splice(newIndex, 0, moved)
      saveData(next)
    },
    [data, saveData],
  )

  const resetToCommitted = useCallback(() => {
    const next = cloneData(committed)
    setData(next)
    localStorage.removeItem(STORAGE_KEY)
  }, [committed])

  const exportJSON = useCallback(() => {
    downloadJSON(data)
  }, [data])

  const diffSummary = useMemo(
    () => computeDiffSummary(data, committed),
    [data, committed],
  )

  const isDirty = diffSummary.total > 0

  return {
    data,
    committed,
    loading,
    error,
    isDirty,
    diffSummary,
    updateCategory,
    updateCapability,
    updateChannelSupport,
    addCapability,
    removeCapability,
    reorderCapability,
    exportJSON,
    resetToCommitted,
  }
}
