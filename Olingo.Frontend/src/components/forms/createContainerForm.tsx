"use client"

import type React from "react"

import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, X, HardDrive } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import{ OlingoIcon } from "@/components/icons/OlingoIcon"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const containerConfigSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  imageSource: z.enum(["docker-registry", "git-provider", "from-file"]),
  imageName: z.string().min(1, "Image name is required").max(100, "Image name must be less than 100 characters"),
  imageTag: z.string().min(1, "Image tag is required").max(20, "Image tag must be less than 20 characters"),
  labels: z
    .record(
      z
        .string()
        .min(1, "Label key cannot be empty")
        .max(30, "Label key must be less than 30 characters")
        .regex(
          /^[a-zA-Z][a-zA-Z0-9._-]*$/,
          "Label key must start with a letter and contain only letters, numbers, dots, underscores, and hyphens",
        ),
      z.string().min(1, "Label value cannot be empty").max(100, "Label value must be less than 100 characters"),
    )
    .refine((labels) => Object.keys(labels).length > 0, {
      message: "At least one label is required",
    }),
  volumeMounts: z
    .record(
      z.string().min(1, "Host path cannot be empty").max(200, "Host path must be less than 200 characters"),
      z
        .string()
        .min(1, "Container path cannot be empty")
        .max(200, "Container path must be less than 200 characters")
        .regex(/^\//, "Container path must start with /"),
    )
    .optional()
    .default({}),
})

type ContainerConfigFormData = z.infer<typeof containerConfigSchema>

export default function Component() {
  const [name, setName] = useState("")
  const [imageSource, setImageSource] = useState<"docker-registry" | "git-provider" | "from-file">("docker-registry")
  const [imageName, setImageName] = useState("")
  const [imageTag, setImageTag] = useState("")
  const [labels, setLabels] = useState<Record<string, string>>({})
  const [volumeMounts, setVolumeMounts] = useState<Record<string, string>>({})
  const [newLabelKey, setNewLabelKey] = useState("")
  const [newLabelValue, setNewLabelValue] = useState("")
  const [newVolumeHost, setNewVolumeHost] = useState("")
  const [newVolumeContainer, setNewVolumeContainer] = useState("")

  const [basicInfoErrors, setBasicInfoErrors] = useState<
    Partial<Record<keyof Omit<ContainerConfigFormData, "labels" | "volumeMounts">, string>>
  >({})
  const [labelErrors, setLabelErrors] = useState<{
    key?: string
    value?: string
    labels?: string
  }>({})
  const [volumeErrors, setVolumeErrors] = useState<{
    host?: string
    container?: string
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addLabel = () => {
    const labelKey = newLabelKey.trim()
    const labelValue = newLabelValue.trim()

    // Basic validation for empty fields
    if (!labelKey || !labelValue) {
      setLabelErrors({
        key: !labelKey ? "Label key is required" : undefined,
        value: !labelValue ? "Label value is required" : undefined,
      })
      return
    }

    // Check for duplicate keys
    if (Object.prototype.hasOwnProperty.call(labels, labelKey)) {
      setLabelErrors({ key: "Label key already exists" })
      return
    }

    // Validate key format
    const keyRegex = /^[a-zA-Z][a-zA-Z0-9._-]*$/
    if (!keyRegex.test(labelKey)) {
      setLabelErrors({
        key: "Label key must start with a letter and contain only letters, numbers, dots, underscores, and hyphens",
      })
      return
    }

    setLabelErrors({})
    setLabels((prev) => ({
      ...prev,
      [labelKey]: labelValue,
    }))
    setNewLabelKey("")
    setNewLabelValue("")
  }

  const removeLabel = (key: string) => {
    setLabels((prev) => {
      const newLabels = { ...prev }
      delete newLabels[key]
      return newLabels
    })
  }

  const addVolumeMount = () => {
    const hostPath = newVolumeHost.trim()
    const containerPath = newVolumeContainer.trim()

    // Basic validation for empty fields
    if (!hostPath || !containerPath) {
      setVolumeErrors({
        host: !hostPath ? "Host path is required" : undefined,
        container: !containerPath ? "Container path is required" : undefined,
      })
      return
    }

    // Validate container path starts with /
    if (!containerPath.startsWith("/")) {
      setVolumeErrors({ container: "Container path must start with /" })
      return
    }

    // Check for duplicate host paths
    if (Object.prototype.hasOwnProperty.call(volumeMounts, hostPath)) {
      setVolumeErrors({ host: "Host path already exists" })
      return
    }

    setVolumeErrors({})
    setVolumeMounts((prev) => ({
      ...prev,
      [hostPath]: containerPath,
    }))
    setNewVolumeHost("")
    setNewVolumeContainer("")
  }

  const removeVolumeMount = (hostPath: string) => {
    setVolumeMounts((prev) => {
      const newMounts = { ...prev }
      delete newMounts[hostPath]
      return newMounts
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent, action: "label" | "volume") => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (action === "label") {
        addLabel()
      } else {
        addVolumeMount()
      }
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Prepare form data
    const formData: ContainerConfigFormData = {
      name,
      imageSource,
      imageName,
      imageTag,
      labels,
      volumeMounts,
    }
    console.log(formData)
    
    // Validate entire form with single schema
    // const result = containerConfigSchema.safeParse(formData)

    // if (!result.success) {
    //   const errors: any = {}
    //   let labelsError = ""

    //   result.error.errors.forEach((error) => {
    //     const path = error.path.join(".")
    //     if (path === "labels") {
    //       labelsError = error.message
    //     } else if (path.startsWith("labels.")) {
    //       // Handle individual label validation errors
    //       console.error("Label validation error:", error.message)
    //     } else {
    //       // Handle basic info errors
    //       errors[error.path[0]] = error.message
    //     }
    //   })

    //   setBasicInfoErrors(errors)
    //   if (labelsError) {
    //     setLabelErrors({ labels: labelsError })
    //   }
    //   setIsSubmitting(false)
    //   return
    // }

    // try {
    //   // Simulate API call with validated data
    //   console.log("Sending to API:", result.data)

    //   const response = await fetch("/api/container-config", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(result.data),
    //   })

    //   if (!response.ok) {
    //     throw new Error("Failed to submit configuration")
    //   }

    //   const responseData = await response.json()
    //   console.log("API Response:", responseData)
    //   alert("Configuration submitted successfully!")
    // } catch (error) {
    //   console.error("Submission error:", error)
    //   alert("Failed to submit configuration. Please try again.")
    // } finally {
    //   setIsSubmitting(false)
    // }
  }

  const labelEntries = Object.entries(labels)
  const volumeEntries = Object.entries(volumeMounts)

  return (
    
    <div className="space-y-4">
      {/* Basic Information - Full Width */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Enter the basic container details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Container Name</Label>
            <Input
              id="name"
              placeholder="Enter container name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (basicInfoErrors.name) {
                  setBasicInfoErrors((prev) => ({ ...prev, name: undefined }))
                }
              }}
              className={basicInfoErrors.name ? "border-red-500" : ""}
            />
            {basicInfoErrors.name && <p className="text-sm text-red-500">{basicInfoErrors.name}</p>}
          </div>

          {/* Image Source Tabs */}
          <div className="space-y-4">
            <Label>Image Source</Label>
            <Tabs value={imageSource} onValueChange={(value : string) => setImageSource(value as typeof imageSource)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="docker-registry">Docker Registry</TabsTrigger>
                <TabsTrigger value="git-provider">
                  Git Provider
                </TabsTrigger>
                <TabsTrigger value="from-file">
                  From File
                </TabsTrigger>
              </TabsList>

              <TabsContent value="docker-registry" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image-name">Image Name</Label>
                    <Input
                      id="image-name"
                      placeholder="e.g., olingo, node, go"
                      value={imageName}
                      onChange={(e) => {
                        setImageName(e.target.value)
                        if (basicInfoErrors.imageName) {
                          setBasicInfoErrors((prev) => ({ ...prev, imageName: undefined }))
                        }
                      }}
                      className={basicInfoErrors.imageName ? "border-red-500" : ""}
                    />
                    {basicInfoErrors.imageName && <p className="text-sm text-red-500">{basicInfoErrors.imageName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image-tag">Image Tag</Label>
                    <Input
                      id="image-tag"
                      placeholder="e.g., latest, v1.0.0"
                      value={imageTag}
                      onChange={(e) => {
                        setImageTag(e.target.value)
                        if (basicInfoErrors.imageTag) {
                          setBasicInfoErrors((prev) => ({ ...prev, imageTag: undefined }))
                        }
                      }}
                      className={basicInfoErrors.imageTag ? "border-red-500" : ""}
                    />
                    {basicInfoErrors.imageTag && <p className="text-sm text-red-500">{basicInfoErrors.imageTag}</p>}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="git-provider" className="space-y-6 mt-6">
                <Alert variant="informational">
                  <OlingoIcon />
                  <AlertTitle>Olingo upcoming feature</AlertTitle>
                  <AlertDescription>
                     A new feature is currently under development and will be available soon. Further details will be provided in due course.
                  </AlertDescription>
                </Alert>
              </TabsContent>

              <TabsContent value="from-file" className="space-y-6 mt-6">
                <Alert variant="informational">
                  <OlingoIcon />
                  <AlertTitle>Olingo upcoming feature</AlertTitle>
                  <AlertDescription>
                     A new feature is currently under development and will be available soon. Further details will be provided in due course.
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Labels and Volume Mounts - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Labels Section */}
        <Card>
          <CardHeader>
            <CardTitle>Labels</CardTitle>
            <CardDescription>Add key-value pair labels</CardDescription>
            <Alert variant="informational">
                <OlingoIcon />
                <AlertTitle>Olingo managed labels</AlertTitle>
                <AlertDescription>
                    All containers managed by Olingo are assigned Olingo-specific labels. These labels serve to facilitate correlation and tracking across the managed resources.
                </AlertDescription>
            </Alert>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="label-key">Key</Label>
                <Input
                  id="label-key"
                  placeholder="Label key"
                  value={newLabelKey}
                  onChange={(e) => {
                    setNewLabelKey(e.target.value)
                    if (labelErrors.key) {
                      setLabelErrors((prev) => ({ ...prev, key: undefined }))
                    }
                  }}
                  onKeyPress={(e) => handleKeyPress(e, "label")}
                  className={labelErrors.key ? "border-red-500" : ""}
                />
                {labelErrors.key && <p className="text-sm text-red-500">{labelErrors.key}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="label-value">Value</Label>
                <Input
                  id="label-value"
                  placeholder="Label value"
                  value={newLabelValue}
                  onChange={(e) => {
                    setNewLabelValue(e.target.value)
                    if (labelErrors.value) {
                      setLabelErrors((prev) => ({ ...prev, value: undefined }))
                    }
                  }}
                  onKeyPress={(e) => handleKeyPress(e, "label")}
                  className={labelErrors.value ? "border-red-500" : ""}
                />
                {labelErrors.value && <p className="text-sm text-red-500">{labelErrors.value}</p>}
              </div>
            </div>

            <Button onClick={addLabel} className="w-full" disabled={!newLabelKey.trim() || !newLabelValue.trim()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Label
            </Button>

            {labelErrors.labels && <p className="text-sm text-red-500">{labelErrors.labels}</p>}

            {/* Labels Preview */}
            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-3">Added Labels ({labelEntries.length})</h4>
              {labelEntries.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No labels added yet</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {labelEntries.map(([key, value]) => (
                    <Badge key={key} variant="secondary" className="px-3 py-1">
                      <span className="font-mono text-xs">
                        {key}={value}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-auto p-0 hover:bg-transparent"
                        onClick={() => removeLabel(key)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Volume Mounts Section */}
        <Card>
          <CardHeader>
            <CardTitle>Volume Mounts</CardTitle>
            <CardDescription>Configure volume mounts for persistent storage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="volume-host">Host Path</Label>
                <Input
                  id="volume-host"
                  placeholder="/host/path"
                  value={newVolumeHost}
                  onChange={(e) => {
                    setNewVolumeHost(e.target.value)
                    if (volumeErrors.host) {
                      setVolumeErrors((prev) => ({ ...prev, host: undefined }))
                    }
                  }}
                  onKeyPress={(e) => handleKeyPress(e, "volume")}
                  className={volumeErrors.host ? "border-red-500" : ""}
                />
                {volumeErrors.host && <p className="text-sm text-red-500">{volumeErrors.host}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="volume-container">Container Path</Label>
                <Input
                  id="volume-container"
                  placeholder="/container/path"
                  value={newVolumeContainer}
                  onChange={(e) => {
                    setNewVolumeContainer(e.target.value)
                    if (volumeErrors.container) {
                      setVolumeErrors((prev) => ({ ...prev, container: undefined }))
                    }
                  }}
                  onKeyPress={(e) => handleKeyPress(e, "volume")}
                  className={volumeErrors.container ? "border-red-500" : ""}
                />
                {volumeErrors.container && <p className="text-sm text-red-500">{volumeErrors.container}</p>}
              </div>
            </div>

            <Button
              onClick={addVolumeMount}
              className="w-full"
              disabled={!newVolumeHost.trim() || !newVolumeContainer.trim()}
            >
              <HardDrive className="w-4 h-4 mr-2" />
              Add Volume Mount
            </Button>

            {/* Volume Mounts Preview */}
            <div className="border-t pt-4 mt-4">
              <h4 className="font-medium mb-3">Added Volume Mounts ({volumeEntries.length})</h4>
              {volumeEntries.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  <HardDrive className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No volume mounts added yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {volumeEntries.map(([hostPath, containerPath]) => (
                    <div key={hostPath} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="font-mono text-xs">
                        {hostPath} → {containerPath}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 hover:bg-transparent"
                        onClick={() => removeVolumeMount(hostPath)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline">Reset</Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Generating..." : "Generate Configuration"}
        </Button>
      </div>
    </div>
  )
}
