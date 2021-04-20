import { Setting } from '@entities/Setting';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Setting)
class SettingsRepository extends Repository<Setting> {}

export { SettingsRepository };
