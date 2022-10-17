declare module "@vue/runtime-core" {
    import { subscriptionStore } from "./../SubscriptionStore";
    import { userStore } from "./../UserStore";
    interface ComponentCustomProperties {
        $subscription: typeof subscriptionStore;
        $user: typeof userStore;
    }
}
export {};
