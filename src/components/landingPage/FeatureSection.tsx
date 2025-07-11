import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Feature {
    icon: React.ReactNode
    title: string
    description: string
}

export default function FeaturesSection({ features }: { features: Feature[] }) {
    return (
        <section id="features" className="py-20 px-4 bg-white">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Code</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Powerful features designed to make web development faster and more enjoyable
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                                    {feature.icon}
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}