export interface Lead {
        id: string;
        userId: string
        companyId: string
        companyPositionId: string
        name: string
        description: string
        amount: number | null
        currency: number | null
        zipCode: string
        streetAddress: string
        streetAddressNumber: string
        streetAddressComplement: string
        city: string
        state: string
        country: string
        members: any
        created: string;
        updated?: string;
        deleted?: string
}