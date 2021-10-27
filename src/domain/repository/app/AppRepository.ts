import User from 'domain/entity/app/User';
import Step from 'domain/entity/app/Step';

export default abstract class AppRepository {
    public abstract getUser(): User;

    public abstract setUser(user: User): void;

    public abstract setStep(step: Step): void;

    public abstract getStep(): Step;
}
